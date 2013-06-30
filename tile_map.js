// Tile Map: Copyright (c) 2013 Matthew Parke mparke78@gmail.com
(function(){
  var win = this;
  
  var Tile = function(data){
    this._data = data || null;
    this.nodes = {
      n: null,
      e: null,
      s: null,
      w: null
    };
  };

  var asTile = (function(){

    function data(){ return this._data; }
    function get(key){ return this._data[key]; }
    function set(key, val){ return this._data[key] = val; }
    function getNode(key){ return this.nodes[key]; }
    function setNode(key, node){ return this.nodes[key] = node; }
    function north(){ return this.nodes.n; };
    function east(){ return this.nodes.e; }
    function south(){ return this.nodes.s; }
    function west(){ return this.nodes.w; }
    
    // hasNext and next iterates nodes from left to right in
    // the east or 'e' direction
    function hasEast(){ return this.nodes.e !== null; }
    function hasWest(){ return this.nodes.w !== null; }
    function hasNorth(){ return this.nodes.n !== null; }
    function hasSouth(){ return this.nodes.s !== null; }

    return function(){
      this.data = data;
      this.get = get;
      this.set = set;
      this.getNode = getNode;
      this.setNode = setNode;

      this.hasNext = hasEast;
      this.next = east;

      this.hasPrev = hasWest;
      this.prev = west;

      this.hasUp = hasNorth;
      this.up = north;

      this.hasDown = hasSouth;
      this.down = south;
    };
  })();
  asTile.call(Tile.prototype);

  var TileMap = function(xSize, data){
    this.rootTile = null;

    if(typeof xSize === 'number' && xSize > 0){
      this.matrix = new Matrix(xSize, data);
      // map calculation returns a pointer to the root
      this.rootTile = this.createTiles();
    }else{
      throw new Error('Row size must be greater than 0.')
    }
  };

  var asTileMap = (function(){

    function createTiles(){
      var mx = this.matrix.data(),
        mxLen = mx.length,
        rootTile = this.rootTile,
        tile, mxRow;

      for(var i = 0; i < mxLen; i++){
        mxRow = mx[i];
        // this is the left most tile in the row
        tile = createTileRow(mxRow);

        if(rootTile !== null){
          mapRows(rootTile, tile);
        }

        rootTile = tile;
      }

      return topLeft(rootTile);
    }

    function createTileRow(mxRow){
      var len = mxRow.length,
        i = 0,
        prevTile = null,
        data,
        tile;

      for(var i = 0; i < len; i++){
        tile = new Tile(mxRow[i]);
          
        if(prevTile !== null){
          //assign tile references   
          prevTile.setNode('e', tile);
          tile.setNode('w', prevTile);
        }

        prevTile = tile;
      }

      return leftMost(tile);
    }

    function mapRows(topTile, bottomTile){
      // map the first, then for all remaining tiles in the two rows
      mapTopToBottom(topTile, bottomTile);
      while(topTile.hasNext() && bottomTile.hasNext()){
        topTile = topTile.next();
        bottomTile = bottomTile.next();
        mapTopToBottom(topTile, bottomTile);
      }
    }

    function mapTopToBottom(topTile, bottomTile){
      topTile.setNode('s', bottomTile);
      bottomTile.setNode('n', topTile);
    }

    function root(){
      return this.rootTile;
    }

    function size(){
      return this.matrix.size();
    }

    function topLeft(tile){
      tile = leftMost(tile);
      tile = topMost(tile);
      return tile;
    }

    function leftMost(tile){
      while(tile.hasPrev()){
        tile = tile.prev();
      }
      return tile;
    }

    function topMost(tile){
      while(tile.hasUp()){
        tile = tile.up();
      }
      return tile;
    }

    function iterateMap(tile, fn, context){
      callAtContext(tile, fn, context);

      while(tile.hasNext()){
        tile = tile.next();
        callAtContext(tile, fn, context);
      }

      // return to the left most
      tile = leftMost(tile);

      // check and iterate the next row
      if(tile.hasDown()){
        iterateMap(tile.down(), fn, context);
      }
    }

    function callAtContext(tile, fn, context){
      if(context){
        fn.call(context, tile);
      }else{
        fn(tile);
      }
    }

    function each(fn, context){
      iterateMap(this.rootTile, fn, context);
    }

    function find(fn, context){
      var result = null;
      iterateMap(this.rootTile, function(tile){
        if(context){
          if(fn.call(context, tile)){
            result = tile;
          }
        }else{
          if(fn(tile)){
            result = tile;
          }
        }
      }, this);
      return result;
    }

    return function(){
      this.createTiles = createTiles;
      this.root = root;
      this.size = size;
      this.topLeft = topLeft;
      this.leftMost = leftMost;
      this.topMost = topMost;
      this.each = each;
      this.find = find;
    };
  })();
  asTileMap.call(TileMap.prototype);
  
  win.Tile = Tile;
  win.TileMap = TileMap;
}).call(this);