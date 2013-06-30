describe('TileMap', function(){

  // create a 16 x 24 (384 size) tile map
  beforeEach(function(){
    var width = 50,
      height = 50,
      totalWidth = 200, 
      totalHeight = 200,
      x = 0,
      y = 0,
      data = [];

    while(y < totalHeight){
      while(x < totalWidth){
        data.push({
          x: x,
          y: y
        });
        x += width;
      }
      x = 0;
      y += height;
    }
    
    this.tileMap = new TileMap(4, data);
  });

  it('should have defaults', function(){
    var tm = this.tileMap;

    expect(tm).toBeDefined();
    expect(tm.rootTile).toBeDefined();
    expect(tm.createTiles).toBeDefined();
    expect(tm.size).toBeDefined();
    expect(typeof tm.size === 'function').toEqual(true);
    expect(tm.topLeft).toBeDefined();
    expect(typeof tm.topLeft === 'function').toEqual(true);
    expect(tm.leftMost).toBeDefined();
    expect(typeof tm.leftMost === 'function').toEqual(true);
    expect(tm.topMost).toBeDefined();
    expect(typeof tm.topMost === 'function').toEqual(true);
    expect(tm.each).toBeDefined();
    expect(typeof tm.each === 'function').toEqual(true);
    expect(tm.find).toBeDefined();
    expect(typeof tm.find === 'function').toEqual(true);
  });

  it('should have a root tile', function(){
    var tm = this.tileMap;

    expect(tm.rootTile.get('x')).toEqual(0);
    expect(tm.rootTile.get('y')).toEqual(0);
    expect(tm.root().get('x')).toEqual(0);
    expect(tm.root().get('y')).toEqual(0);        
  });

  it('should return the size', function(){
    var tm = this.tileMap;

    expect(tm.size()).toEqual(16);    
  });

  it('should be able to get the left most tile', function(){
    var tm = this.tileMap,
      tile = tm.root();

    // iterate to the right of the map
    while(tile.hasNext()){
      tile = tile.next();
    }

    expect(tile.get('x')).toEqual(150);
    expect(tile.get('y')).toEqual(0);
  
    tile = tm.leftMost(tile);
    expect(tile).toBeDefined();
    expect(tile.get('x')).toEqual(0);
    expect(tile.get('y')).toEqual(0);
  });

  it('should be able to get the top most tile', function(){
    var tm = this.tileMap,
      tile = tm.root();

    // iterate to the bottom of the map
    while(tile.hasDown()){
      tile = tile.down();
    }

    expect(tile.get('x')).toEqual(0);
    expect(tile.get('y')).toEqual(150);

    tile = tm.topMost(tile);
    expect(tile).toBeDefined();
    expect(tile.get('x')).toEqual(0);
    expect(tile.get('y')).toEqual(0);
  });

  it('should be iterable with each', function(){
    var tm = this.tileMap;
    var spy = jasmine.createSpy();

    tm.each(spy);
    expect(spy).toHaveBeenCalled();
    expect(spy.callCount).toEqual(tm.size());
  });

  // tests all four corners
  it('should be able to find a tile in the map', function(){
    var tm = this.tileMap;
    var spy = jasmine.createSpy();

    tm.find(spy);
    expect(spy).toHaveBeenCalled();
    expect(spy.callCount).toEqual(tm.size());
  
    var result = tm.find(function(tile){
      return (tile.get('x') === 0 && tile.get('y') === 0);
    }); 
  
    expect(result).toBeDefined();
    expect(result.hasNext()).toEqual(true);
    expect(result.hasPrev()).toEqual(false);
    expect(result.hasUp()).toEqual(false);
    expect(result.hasDown()).toEqual(true);    

    result = tm.find(function(tile){
      return (tile.get('x') === 150 && tile.get('y') === 0);
    });

    expect(result).toBeDefined();
    expect(result.hasNext()).toEqual(false);
    expect(result.hasPrev()).toEqual(true);
    expect(result.hasUp()).toEqual(false);
    expect(result.hasDown()).toEqual(true);

    result = tm.find(function(tile){
      return (tile.get('x') === 0 && tile.get('y') === 150);
    });

    expect(result).toBeDefined();
    expect(result.hasNext()).toEqual(true);
    expect(result.hasPrev()).toEqual(false);
    expect(result.hasUp()).toEqual(true);
    expect(result.hasDown()).toEqual(false);

    result = tm.find(function(tile){
      return (tile.get('x') === 150 && tile.get('y') === 150);
    });

    expect(result).toBeDefined();
    expect(result.hasNext()).toEqual(false);
    expect(result.hasPrev()).toEqual(true);
    expect(result.hasUp()).toEqual(true);
    expect(result.hasDown()).toEqual(false);
  });
});