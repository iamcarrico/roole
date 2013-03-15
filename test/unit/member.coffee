assert = require '../assert'

suite 'member expressions'

test 'foreach loop over', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 @for $num in $list {
    .icon-$num {
      -foo: $num * 1em;
    }
  }
	''', '''
		.icon-0 {
			-foo: 0em;
		}

		.icon-1 {
			-foo: 1em;
		}

		.icon-2 {
			-foo: 2em;
		}
	'''

test 'single value expression', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 body {
	   -foo: $list[1];
	 }
	''', '''
		body {
			-foo: 1;
		}
	'''

test 'negative value expression', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 body {
	   -foo: $list[-1];
	 }
	''', '''
		body {
			-foo: 2;
		}
	'''

test 'null member expression', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 body {
	   -foo: $list[3];
	 }
	''', '''
		body {
			-foo: null;
		}
	'''

test 'list within a list', ->
	assert.compileTo '''
	 $list = 0 (a b c) 2;
	 body {
	   -foo: $list[1];
	 }
	''', '''
		body {
			-foo: a b c;
		}
	'''

test 'range expression', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 body {
	   -foo: $list[1..2];
	 }
	''', '''
		body {
			-foo: 1 2;
		}
	'''

test 'negative range', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 body {
	   -foo: $list[-1..0];
	 }
	''', '''
		body {
			-foo: 2 1 0;
		}
	'''

test 'inverse range', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 body {
	   -foo: $list[2..0];
	 }
	''', '''
		body {
			-foo: 2 1 0;
		}
	'''

test 'single range', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 body {
	   -foo: $list[1...2];
	 }
	''', '''
		body {
			-foo: 1;
		}
	'''
