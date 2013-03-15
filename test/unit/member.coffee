assert = require '../assert'

suite 'member expressions'

test 'foreach loop over', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 @for $num in $list {
    .icon-$num {
      margin-right: $num * 1em;
    }
  }
	''', '''
		.icon-0 {
			margin-right: 0em;
		}

		.icon-1 {
			margin-right: 1em;
		}

		.icon-2 {
			margin-right: 2em;
		}
	'''

test 'basic member expression', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 .test {
	   margin: $list[1] * 1em;
	 }
	''', '''
		.test {
			margin: 1em;
		}
	'''

test 'complex member expression', ->
	assert.compileTo '''
	 $list = 0 1 2;
	 .test {
	   margin-right: $list[1..2];
	 }
	''', '''
		.test {
			margin-right: 1 2;
		}
	'''
