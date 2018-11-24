import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';



it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                '\tlet x,y,z,t;\n' +
                '\tif(z>y){\n' +
                '\t\treturn F;\n' +
                '\t}\n' +
                '\telse if(x != y && z>y){\n' +
                '\t\treturn T;\n' +
                '\t}\n' +
                '        else{\n' +
                '\t\treturn T;\n' +
                '\t}\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x"},{"Line":2,"Type":"Variable Declaration","Name":"y"},{"Line":2,"Type":"Variable Declaration","Name":"z"},{"Line":2,"Type":"Variable Declaration","Name":"t"},{"Line":3,"Type":"If Statement","Condition":"z>y"},{"Line":4,"Type":"Return Statement","Value":"F"},{"Line":6,"Type":"Else If Statement","Condition":"x != y && z>y"},{"Line":7,"Type":"Return Statement","Value":"T"},{"Line":10,"Type":"Return Statement","Value":"T"}]'
    );
});
it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test() {\n' +
                ' var ww = 0;\n' +
                ' var y = 98;\n' +
                ' let a = 813/7;\n' +
                ' var y = 9;\n' +
                '} ')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"ww","Value":0},{"Line":3,"Type":"Variable Declaration","Name":"y","Value":98},{"Line":4,"Type":"Variable Declaration","Name":"a","Value":"813/7"},{"Line":5,"Type":"Variable Declaration","Name":"y","Value":9}]'
    );
});


it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('\n' +
                'function test() {\n' +
                '    x=1+i;\n' +
                '\tlet arr = [];\n' +
                '\tarr[i] = 5;\n' +
                '}')),
        '[{"Line":2,"Type":"Function Declaration","Name":"test"},{"Line":3,"Type":"Assignment Expression","Name":"x","Value":"1+i"},{"Line":4,"Type":"Variable Declaration","Name":"arr","Value":"[]"},{"Line":5,"Type":"Assignment Expression","Name":"\\tarr[i]","Value":"5"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test() {\n' +
                ' hadar=10+7+55+8*T.len();\n' +
                ' return;\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Assignment Expression","Name":"hadar","Value":"10+7+55+8*T.len()"},{"Line":3,"Type":"Return Statement","Value":""}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                '\tlet x,y,z,t;\n' +
                '\tif(x>y){\n' +
                'swap(1);\n' +
                '\t}\n' +
                '\telse if(z<t){\n' +
                '\t\tswap(12);\n' +
                '\t}\n' +
                '    else{\n' +
                '\t\tswap(13);\n' +
                '\t}\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x"},{"Line":2,"Type":"Variable Declaration","Name":"y"},{"Line":2,"Type":"Variable Declaration","Name":"z"},{"Line":2,"Type":"Variable Declaration","Name":"t"},{"Line":3,"Type":"If Statement","Condition":"x>y"},{"Line":4,"Type":"Call Expression","Value":"swap(1)"},{"Line":6,"Type":"Else If Statement","Condition":"z<t"},{"Line":7,"Type":"Call Expression","Value":"swap(12)"},{"Line":10,"Type":"Call Expression","Value":"swap(13)"}]'
    );
});
it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(f, a) {\n' +
                'let w =5;\n' +
                'var x = 5+6;\n' +
                'var arr = [1,2,3];\n' +
                'var result = [];\n' +
                'var x;\n' +
                'for (x = 0; x != x.length; x++){\n' +
                'result[x] = f(a[x]);\n' +
                '}\n' +
                'return result;\n' +
                '} ')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":1,"Type":"Variable Declaration","Name":"f"},{"Line":1,"Type":"Variable Declaration","Name":"a"},{"Line":2,"Type":"Variable Declaration","Name":"w","Value":5},{"Line":3,"Type":"Variable Declaration","Name":"x","Value":"5+6"},{"Line":4,"Type":"Variable Declaration","Name":"arr","Value":"[1,2,3]"},{"Line":5,"Type":"Variable Declaration","Name":"result","Value":"[]"},{"Line":6,"Type":"Variable Declaration","Name":"x"},{"Line":7,"Type":"For Statement","Condition":"x != x.length"},{"Line":7,"Type":"Assignment Expression","Name":"x","Value":"0"},{"Line":7,"Type":"Update Expression","Name":"x","Operator":"++"},{"Line":8,"Type":"Assignment Expression","Name":"result[x]","Value":"f(a[x])"},{"Line":10,"Type":"Return Statement","Value":"result"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(x,y) {\n' +
                ' if(x>y){\n' +
                '    GCD(y,x);\n' +
                ' }\n' +
                ' else{\n' +
                '    return len;\n' +
                ' }\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":1,"Type":"Variable Declaration","Name":"x"},{"Line":1,"Type":"Variable Declaration","Name":"y"},{"Line":2,"Type":"If Statement","Condition":"x>y"},{"Line":3,"Type":"Call Expression","Value":"GCD(y,x)"},{"Line":6,"Type":"Return Statement","Value":"len"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                'let x= 5;\n' +
                'let i =9;\n' +
                'if(i<7){\n' +
                'let x= 3;\n' +
                '}\n' +
                'else if(3>x){\n' +
                'let x=x+ 5;\n' +
                '}\n' +
                'else if(x<5){\n' +
                'i=4;\n' +
                '}\n' +
                'else{\n' +
                'x=5\n' +
                '}\n' + '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":5},{"Line":3,"Type":"Variable Declaration","Name":"i","Value":9},{"Line":4,"Type":"If Statement","Condition":"i<7"},{"Line":5,"Type":"Variable Declaration","Name":"x","Value":3},{"Line":7,"Type":"Else If Statement","Condition":"3>x"},{"Line":8,"Type":"Variable Declaration","Name":"x","Value":"x+5"},{"Line":10,"Type":"Else If Statement","Condition":"x<5"},{"Line":11,"Type":"Assignment Expression","Name":"i","Value":"4"},{"Line":14,"Type":"Assignment Expression","Name":"x","Value":"5"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test() {\n' +
                ' arr.push(table[index++]);\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Call Expression","Value":"arr.push(table[index++])"}]'
    );
});

it('is parsing a simple variable declaration correctly', () => {
    assert.equal(JSON.stringify(parseCode(' let i=0;')),
        '[{"Line":1,"Type":"Variable Declaration","Name":"i","Value":0}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                'let x=1\n' +
                'while(x[2]<5){\n' +
                '   x=x+i;\n' +
                '   }\n' +
                'return x;\n' +
                ' }')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":1},{"Line":3,"Type":"While Statement","Condition":"x[2]<5"},{"Line":4,"Type":"Assignment Expression","Name":"x","Value":"x+i"},{"Line":6,"Type":"Return Statement","Value":"x"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                ' let x=1;\n' +
                ' for(i=0;i<=10;i=i+1){\n' +
                '  x=x+i;\n' +
                ' }\n' +
                ' return x;\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":1},{"Line":3,"Type":"For Statement","Condition":"i<=10"},{"Line":3,"Type":"Assignment Expression","Name":"i","Value":"0"},{"Line":3,"Type":"Assignment Expression","Name":"i","Value":"i+1"},{"Line":4,"Type":"Assignment Expression","Name":"x","Value":"x+i"},{"Line":6,"Type":"Return Statement","Value":"x"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                ' let x=1;\n' +
                '  x=x+1;\n' +
                ' for(i=0;i<=10;i=i+1){\n' +
                '  a=b+1;\n' +
                '  c=d+7;\n' +
                ' }\n' +
                ' return x;\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":1},{"Line":3,"Type":"Assignment Expression","Name":"x","Value":"x+1"},{"Line":4,"Type":"For Statement","Condition":"i<=10"},{"Line":4,"Type":"Assignment Expression","Name":"i","Value":"0"},{"Line":4,"Type":"Assignment Expression","Name":"i","Value":"i+1"},{"Line":5,"Type":"Assignment Expression","Name":"a","Value":"b+1"},{"Line":6,"Type":"Assignment Expression","Name":"c","Value":"d+7"},{"Line":8,"Type":"Return Statement","Value":"x"}]'
    );
});
it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test() {\n' +
                ' arr=time+e34+2\n' +
                '} ')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Assignment Expression","Name":"arr","Value":"time+e34+2"}]'
    );
});
it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                'let x= 5;\n' +
                'let i =9;\n' +
                'if(i<7){\n' +
                'let x= 3;\n' +
                '}\n' +
                'else if(i<9){\n' +
                'let x= 3;\n' +
                '}\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":5},{"Line":3,"Type":"Variable Declaration","Name":"i","Value":9},{"Line":4,"Type":"If Statement","Condition":"i<7"},{"Line":5,"Type":"Variable Declaration","Name":"x","Value":3},{"Line":7,"Type":"Else If Statement","Condition":"i<9"},{"Line":8,"Type":"Variable Declaration","Name":"x","Value":3}]'
    );
});
it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                'let x= 5;\n' +
                'let i =9;\n' +
                'if(i<7){\n' +
                'let x= 3;\n' +
                '}\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":5},{"Line":3,"Type":"Variable Declaration","Name":"i","Value":9},{"Line":4,"Type":"If Statement","Condition":"i<7"},{"Line":5,"Type":"Variable Declaration","Name":"x","Value":3}]'
    );
});
it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test(){\n' +
                'let x=2;\n' +
                'x=x+1;\n' +
                'x++;\n' +
                'return x;\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":2},{"Line":3,"Type":"Assignment Expression","Name":"x","Value":"x+1"},{"Line":4,"Type":"Update Expression","Name":"x","Operator":"++"},{"Line":5,"Type":"Return Statement","Value":"x"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('    function test() {\n' +
                '        let x = func.field.size;\n' +
                '    }')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":"func.field.size"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test() {\n' +
                ' var x = func.field[x]\n' +
                '}')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"x","Value":"func.field[x]"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test() {\n' +
                ' result.push();\n' +
                '} ')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Call Expression","Value":"result.push()"}]'
    );
});

it('is parsing an empty function correctly', () => {
    assert.equal(
        JSON.stringify(parseCode('function test() {\n' +
                'var i =1;\n' +
                'var j =10;\n' +
                ' if(x[0]<j[i]){\n' +
                ' return arr[i];\n' +
                ' }\n' +
                'else{\n' +
                'j=10;\n' +
                '}\n' +
                '} ')),
        '[{"Line":1,"Type":"Function Declaration","Name":"test"},{"Line":2,"Type":"Variable Declaration","Name":"i","Value":1},{"Line":3,"Type":"Variable Declaration","Name":"j","Value":10},{"Line":4,"Type":"If Statement","Condition":"x[0]<j[i]"},{"Line":5,"Type":"Return Statement","Value":"arr[i]"},{"Line":8,"Type":"Assignment Expression","Name":"j","Value":"10"}]'
    );
});



