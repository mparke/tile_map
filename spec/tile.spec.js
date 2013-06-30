describe('Tile', function(){

  beforeEach(function(){
    var data = { one: 1, two: 2, three: 3 };
    this.tile = new Tile(data);
  });

  it('should have defaults', function(){
    var t = this.tile;

    expect(t).toBeDefined();
    expect(t._data).toBeDefined();
    expect(t.data).toBeDefined();
    expect(t.nodes).toBeDefined();
    expect(t.nodes.n).toBeNull();
    expect(t.nodes.e).toBeNull();
    expect(t.nodes.s).toBeNull();
    expect(t.nodes.w).toBeNull();
    expect(typeof t.data === 'function').toBe(true);
    expect(t.get).toBeDefined();
    expect(typeof t.get === 'function').toBe(true);
    expect(t.set).toBeDefined();
    expect(typeof t.set === 'function').toBe(true);
    expect(t.getNode).toBeDefined();
    expect(typeof t.getNode === 'function').toBe(true);
    expect(t.setNode).toBeDefined();
    expect(typeof t.setNode === 'function').toBe(true);
    expect(t.up).toBeDefined();
    expect(typeof t.up === 'function').toBe(true);
    expect(t.hasUp).toBeDefined();
    expect(typeof t.hasUp === 'function').toBe(true);
    expect(t.down).toBeDefined();
    expect(typeof t.down === 'function').toBe(true);
    expect(t.hasDown).toBeDefined();
    expect(typeof t.hasDown === 'function').toBe(true);
    expect(t.hasNext).toBeDefined();
    expect(typeof t.hasNext === 'function').toBe(true);
    expect(t.next).toBeDefined();
    expect(typeof t.next === 'function').toBe(true);
    expect(t.hasPrev).toBeDefined();
    expect(typeof t.hasPrev === 'function').toBe(true);
    expect(t.prev).toBeDefined();
    expect(typeof t.prev === 'function').toBe(true);
  });

  it('should return data', function(){
    var t = this.tile;
    expect(t.data()).toBeDefined();
    expect(t.data().one).toBe(1);
  });

  it('should return a value from data by key', function(){
    var t = this.tile;
    expect(t.get('one')).toBe(1);
    expect(t.get('two')).toBe(2);
    expect(t.get('three')).toBe(3);
  });

  it('should set a data value by key and value', function(){
    var t = this.tile;
    expect(t.set('test', 10)).toBe(10);
    expect(t.get('test')).toBe(10);
    expect(t.set('super', 'duper')).toBe('duper');
    expect(t.get('super')).toBe('duper');
  });

  it('should get a node by available key', function(){
    var t = this.tile;
    expect(t.getNode('n')).toBeNull();
    expect(t.getNode('e')).toBeNull();
    expect(t.getNode('s')).toBeNull();
    expect(t.getNode('w')).toBeNull();

    t.nodes.n = new Tile({ north: true });
    t.nodes.e = new Tile({ east: true });
    t.nodes.s = new Tile({ south: true });
    t.nodes.w = new Tile({ west: true });

    expect(t.getNode('n')).toBeDefined();
    expect(t.getNode('n').get('north')).toBe(true);
    expect(t.getNode('e')).toBeDefined();
    expect(t.getNode('e').get('east')).toBe(true);
    expect(t.getNode('s')).toBeDefined();
    expect(t.getNode('s').get('south')).toBe(true);
    expect(t.getNode('w')).toBeDefined();
    expect(t.getNode('w').get('west')).toBe(true);
  });

  it('should set a node by available key', function(){
    var t = this.tile;
    t.setNode('n', new Tile({ north: true }));
    t.setNode('e', new Tile({ east: true }));
    t.setNode('s', new Tile({ south: true }));
    t.setNode('w', new Tile({ west: true }));

    expect(t.getNode('n')).toBeDefined();
    expect(t.getNode('n').get('north')).toBe(true);
    expect(t.getNode('e')).toBeDefined();
    expect(t.getNode('e').get('east')).toBe(true);
    expect(t.getNode('s')).toBeDefined();
    expect(t.getNode('s').get('south')).toBe(true);
    expect(t.getNode('w')).toBeDefined();
    expect(t.getNode('w').get('west')).toBe(true);
  });

  it('should return an up node', function(){
    var t = this.tile;
    t.setNode('n', new Tile({ north: true }));
    expect(t.up()).toBeDefined();
    expect(t.up().get('north')).toBe(true);
  });

  it('should return a next node', function(){
    var t = this.tile;
    t.setNode('e', new Tile({ east: true }));
    expect(t.next()).toBeDefined();
    expect(t.next().get('east')).toBe(true);
  });

  it('should return an down node', function(){
    var t = this.tile;
    t.setNode('s', new Tile({ south: true }));
    expect(t.down()).toBeDefined();
    expect(t.down().get('south')).toBe(true);
  });

  it('should return a prev node', function(){
    var t = this.tile;
    t.setNode('w', new Tile({ west: true }));
    expect(t.prev()).toBeDefined();
    expect(t.prev().get('west')).toBe(true);
  });

  it('should support hasNext', function(){
    var t = this.tile;
    expect(t.hasNext()).toBe(false);
    t.setNode('e', new Tile({ east: true }));
    expect(t.hasNext()).toBe(true);
  });

  it('should support next', function(){
    var t = this.tile;
    expect(t.hasNext()).toBe(false);
    t.setNode('e', new Tile({ east: true }));
    expect(t.hasNext()).toBe(true);
    expect(t.next()).toBeDefined();
    expect(t.next().get('east')).toBe(true);
  });

  it('should support hasPrev', function(){
    var t = this.tile;
    expect(t.hasPrev()).toBe(false);
    t.setNode('w', new Tile({ west: true }));
    expect(t.hasPrev()).toBe(true);
  });

  it('should support prev', function(){
    var t = this.tile;
    expect(t.hasPrev()).toBe(false);
    t.setNode('w', new Tile({ west: true }));
    expect(t.hasPrev()).toBe(true);
    expect(t.prev()).toBeDefined();
    expect(t.prev().get('west')).toBe(true);
  });

  it('should support hasUp', function(){
    var t = this.tile;
    expect(t.hasUp()).toBe(false);
    t.setNode('n', new Tile({ north: true }));
    expect(t.hasUp()).toBe(true);
  });

  it('should support up', function(){
    var t = this.tile;
    expect(t.hasUp()).toBe(false);
    t.setNode('n', new Tile({ north: true }));
    expect(t.hasUp()).toBe(true);
    expect(t.up()).toBeDefined();
    expect(t.up().get('north')).toBe(true);
  });

  it('should support hasDown', function(){
    var t = this.tile;
    expect(t.hasDown()).toBe(false);
    t.setNode('s', new Tile({ south: true }));
    expect(t.hasDown()).toBe(true);
  });

  it('should support down', function(){
    var t = this.tile;
    expect(t.hasDown()).toBe(false);
    t.setNode('s', new Tile({ south: true }));
    expect(t.hasDown()).toBe(true);
    expect(t.down()).toBeDefined();
    expect(t.down().get('south')).toBe(true);
  });
});

