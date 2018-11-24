import * as esprima from 'esprima';


var func_code  = '';

const parseCode = (codeToParse) => {
    func_code = codeToParse;
    var parsed =  esprima.parseScript(codeToParse, {loc : true});
    //return parsed;
    var table = MatchTypeToFunction(parsed);
    return table;
};

// the main function

function MatchTypeToFunction(json) {
    var to_return =[];

    if (json.type === 'Program') {
        return to_return.concat(ToJsonProgramType(json));
    }
    else if (json.type === 'FunctionDeclaration') {
        return ToJsonFunction(json);
    }
    else if (json.type == 'ForStatement'){
        return to_return.concat(ToJsonForStatement(json));
    }
    else if (json.type == 'WhileStatement'){
        return to_return.concat(ToJsonWhileStatement(json));
    }
    else {
        return f4(json);
    }
}

function f4(json) {
    var to_return = [], i;
    if (json.type === 'VariableDeclaration'){
        return to_return.concat(ToJsonVariableDeclaration(json));
    }
    else if (json.type == 'IfStatement'){
        return to_return.concat(ToJsonIfStatent(json));
    }
    else if (json.type === 'BlockStatement'){
        var len = json.body.length-1;
        for( i = 0; i <= len ; i++) {
            to_return = to_return.concat(MatchTypeToFunction(json.body[i]));
        }
        return to_return;
    }
    else {
        return f3(json);
    }
}

function f3(json) {
    var to_return =[], line, type,value;
    if (json.type === 'ReturnStatement'){
        //console.log( 'ReturnStatement')
        line = json.loc.start.line;
        type = 'Return Statement';
        value = '';
        if (json.argument !== null) {
            value = substring_to_code(json.argument.loc);
        }
        return to_return.concat({'Line': line, 'Type': type, 'Value': value});
    }
    else if (json.type === 'ExpressionStatement'){
        //console.log( 'ExpressionStatement')
        return to_return.concat(MatchTypeToFunction(json.expression));
    }
    else {
        return f2(json);
    }
}

function f2(json) {
    var line, type, name ='' ,to_return = [];
    if (json.type === 'AssignmentExpression'){
        //console.log( 'AssignmentExpression')
        line = json.left.loc.start.line;
        type = 'Assignment Expression';
        if (json.left.type === 'MemberExpression'){ name = TakeTheDeclerationLeft(json.loc);}
        else { name = json.left.name; }
        // thr number from the right assignment
        var the_value_of_aAssignment = json.right;
        var add_row = {'Line': line, 'Type': type, 'Name': name,'Value': substring_to_code(the_value_of_aAssignment.loc)};
        return to_return.concat(add_row);  }
    else if (json.type ==='UpdateExpression') {
        line = json.loc.start.line;
        type = 'Update Expression';
        name = json.argument.name;
        var operator = json.operator;
        return to_return.concat({'Line': line, 'Type': type, 'Name': name, 'Operator':operator}); }
    else { return f(json); }
}

function f(json) {
    var i, x ,value = '', line, type, to_return = [];
    // CallExpression

    var rows = func_code.split('\n');
    var val = rows[json.loc.start.line-1];
    line = json.loc.start.line;
    type = 'Call Expression';
    for (i=0; i< val.length; i++){
        x =val[i];
        value = f1(x, value);
    }
    return to_return.concat({'Line': line, 'Type': type, 'Value': value});
}

function f1(x, value) {
    if (x !== ' ' && x !== ';' && x !== '\v' && x !== '\t'){
        value = value +x;
    }
    return value;

}

// this function hendle with decleraion of complecs things like "var arr[i] = 3" or "var x[7]= 6" so i need x=7
function TakeTheDeclerationLeft(loc) {
    var rows = func_code.split('\n');
    var row_to_substring = rows[loc.start.line-1];
    var flag = true, to_return='', i;
    var ret =[];
    for ( i =0; i< row_to_substring.length;i++){
        ret= func(flag, row_to_substring, i, to_return);
        to_return = ret[0];
        flag = ret[1];
    }
    return to_return;
}

function func(flag, row_to_substring, i, to_return) {
    var ret =[];
    if (flag && row_to_substring[i] !== '=' && row_to_substring[i] !== ' '){
        to_return = to_return + row_to_substring[i];
    }
    if (row_to_substring[i] === '='){
        flag = false;
    }
    ret[0] = to_return;
    ret[1] = flag;
    return ret;
}


function ToJsonIfStatent(JSON){
    var line =JSON.loc.start.line;
    var send_concat = JSON.consequent;
    var type = 'If Statement';
    var condition = substring_to_code(JSON.test.loc);
    var to_return = [];
    to_return.push({'Line': line, 'Type': type,'Condition': condition});
    to_return = to_return.concat(MatchTypeToFunction(send_concat));
    if (JSON.alternate == null){
        return to_return;
    }
    else if (JSON.alternate.type==='IfStatement'){
        return to_return.concat(ToJsonElIf(JSON.alternate));
    }
    else{
        return to_return.concat(MatchTypeToFunction(JSON.alternate));
    }
}


//// all the other funcion

function ToJsonVariableDeclaration(JSON){
    var type = 'Variable Declaration', to_return = [], i , variable_declarator;
    var len = JSON.declarations.length-1;
    for(i = 0; i <= len; i++) {
        variable_declarator = JSON.declarations[i];
        var line = variable_declarator.loc.start.line;
        var name = variable_declarator.id.name;
        var row_add = {'Line': line,'Type': type,'Name': name};
        if (variable_declarator.init != null){
            if (variable_declarator.init.type === 'Literal'){
                row_add.Value=variable_declarator.init.value;//////////////////////////////////////////////////
            }
            //MemberExpression , BinaryExpression , ArrayExpression
            else{ row_add.Value = TakeTheDecleration(JSON.loc); }
        }
        to_return = to_return.concat([row_add]);
    }
    return to_return;
}

// this function hendle with decleraion of complecs things like "var arr = [1,2,3]" or "var x= 5+6"
function TakeTheDecleration(loc) {
    var rows = func_code.split('\n');
    var row_to_substring = rows[loc.start.line-1];
    var flag = false, to_return='';
    for (var i =0; i< row_to_substring.length;i++){
        if (flag){
            if (row_to_substring[i] != ' ') { to_return = to_return + row_to_substring[i]; }
        }
        else { if (row_to_substring[i] == '='){ flag = true; }
        }
    }
    return whit_out(to_return);
}

// whit out the ";"
function whit_out(to_return) {
    var to_return_whit_out ='';
    for (var i=0;i<to_return.length;i++){
        if (to_return[i] !== ';'){
            to_return_whit_out = to_return_whit_out + to_return[i];
        }
    }
    return to_return_whit_out;
}

function ToJsonWhileStatement(JSON){
    var type = 'While Statement';
    var line = JSON.loc.start.line;
    var Condition = substring_to_code(JSON.test.loc);
    var row_add = {'Line': line,'Type': type,'Condition': Condition };
    row_add = [row_add];
    return row_add.concat(MatchTypeToFunction(JSON.body));
}

// this function get the Program json and send only the body to MatchTypeToFunction
function ToJsonProgramType(JSON){
    var to_return = [];
    var len = JSON.body.length-1;
    for(var i = 0; i <= len; i++) {
        // the body of the program
        var body = JSON.body[i];
        to_return = to_return.concat(MatchTypeToFunction(body));
    }
    return to_return;
}

// the function get json of func, insert the row of this func and send the params to MatchTypeToFunction
function ToJsonFunction(JSON_func){

    var to_return = [], i, row_to_add, next_JSON;
    var len = JSON_func.params.length-1;
    var line = JSON_func.id.loc.start.line;
    var type = 'Function Declaration';
    var name = JSON_func.id.name;
    to_return.push({'Line': line, 'Type': type ,'Name': name });
    for(i =0; i <= len ; i++) {
        line = JSON_func.params[i].loc.start.line;
        type = 'Variable Declaration';
        name= JSON_func.params[i].name;
        row_to_add = {'Line': line, 'Type': type ,'Name': name };
        to_return.push(row_to_add);
    }
    next_JSON = JSON_func.body;
    return to_return.concat(MatchTypeToFunction(next_JSON));
}

/**
 "loc": {
                "start": {
                  "line": 3,
                  "column": 4
                },
                "end": {
                  "line": 3,
                  "column": 11
                }
 */

function substring_to_code(loc){
    // split the lines of the original code
    var rows = func_code.split('\n');
    var row_to_substring = rows[loc.start.line-1];
    var end_col = loc.end.column;
    var start_col = loc.start.column;
    return row_to_substring.substring(start_col, end_col);
}

//alternate
function ToJsonElIf(JSON){
    var line =  JSON.loc.start.line;
    var type = 'Else If Statement';
    var condition = substring_to_code(JSON.test.loc);
    var conequent =JSON.consequent;
    var alternate = JSON.alternate;
    var to_return = [];

    to_return.push({'Line': line ,'Type':type,'Condition':condition});

    to_return = to_return.concat(MatchTypeToFunction(conequent));
    if (alternate === null){ return to_return;}
    else if (alternate.type === 'IfStatement'){
        return to_return.concat(ToJsonElIf(alternate));
    }
    else{
        return to_return.concat(MatchTypeToFunction(alternate));
    }
}

function ToJsonForStatement(JSON){

    var to_return = [];
    var line =JSON.loc.start.line;
    var type = 'For Statement';

    to_return.push({'Line': line, 'Type': type, 'Condition': substring_to_code(JSON.test.loc)});
    // send all the rest paraneters to do MatchTypeToFunction
    to_return = to_return.concat(MatchTypeToFunction(JSON.init));
    to_return = to_return.concat(MatchTypeToFunction(JSON.update));
    to_return = to_return.concat(MatchTypeToFunction(JSON.body));

    return to_return;
}



export {parseCode};