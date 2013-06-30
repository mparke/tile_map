<pre>
  TileMap
</pre>

A JavaScript 2 dimensional array module
[![Build Status](https://travis-ci.org/mparke/tile_map.png?branch=master)](https://travis-ci.org/mparke/tile_map)

### Instantiation
<pre>
   <code>
     // create a 2 x 2 tile map
     var tileMap = new TileMap(2, [1, 2, 3, 4]);
   </code>
</pre>

<pre>
    // internal representation

                  null             null
                   ^                ^
                   |                |
                   +                +
               +------+          +------+
               |      |&lt;-----+|      |
  null &lt;---+| root |          |      |+---&gt; null
               |      |+-----&gt;|      |
               +------+          +------+
                 +  ^              +  ^
                 |  |              |  |
                 v  +              v  +
               +------+          +------+
               |      |&lt;-----+|      |
  null &lt;---+|      |          |      |+---&gt; null
               |      |+-----&gt;|      |
               +------+          +------+
                   +                 +
                   |                 |
                   v                 v
                  null             null
</pre>

### API
##### Tile
- <code>data()</code>
- <code>get(key) // gets data value at key</code>
- <code>set(key, val) // set data value at key</code>
- <code>getNode(key) // get a node at direction key, 'n', 'e', 's', 'w'</code>
- <code>setNode(key, node) // set a node reference at key</code>
- <code>hasNext()</code>
- <code>next()</code>
- <code>hasPrev()</code>
- <code>prev()</code>
- <code>hasUp()</code>
- <code>up()</code>
- <code>hasDown()</code>
- <code>down()</code>

##### TileMap
- <code>root() // returns the root tile</code>
- <code>size()</code>
- <code>leftMost(tile) // returns the left most tile in relation to the given tile</code>
- <code>topMost(tile) // returns the top most tile in relation to the given tile</code>
- <code>each(function(tile){})</code>
- <code>find(function(tile){ return true; })</code>

