'use strict'

var TYPE_SIZE_TBL = {
    'INT' : 4,
    'UINT' : 4,
    'INT8' : 1,
    'INT16' : 2,
    'INT32' : 4,
    'INT64' : 8,
    'UINT8' : 1,
    'UINT16' : 2,
    'UINT32' : 4,
    'UINT64' : 8,
    'FLOAT' : 4,
    'DOUBLE' : 8,
}

var BufferReader = module.exports = function(buff){
    this.buff = buff
    this.pos = 0
}
BufferReader.prototype.binary = function(size){
    var data = this.buff.slice(this.pos, this.pos + size)
    this.pos += size
    return data
}
BufferReader.prototype.touch = function(size){
    return this.buff.slice(this.pos, this.pos + size)
}
BufferReader.prototype.len = function(){
    return this.buff.length
}
BufferReader.prototype.isEnd = function(){
    return this.buff.length <= this.pos
}

BufferReader.prototype.type = function(type){
    switch(type){
    case 'int8': return this.int8()
    case 'uint8': return this.uint8()
    case 'int16': return this.uint16()
    case 'uint16': return this.int16()
    case 'int32': return this.int32()
    case 'uint32': return this.uint32()
    case 'int64': return this.int64()
    case 'uint64': return this.uint64()
    case 'float': return this.float()
    case 'double': return this.double()
    default :
        throw new Error('unkown type');
    }
}
BufferReader.prototype.array = function(type, num){
    var list = new Array(num)
    for(var i = 0; i<num; ++i){
        list[i] = this.type(type)
    }
    return list
}
BufferReader.prototype.int8 = function(){
    var data = this.buff.readInt8(this.pos)
    this.pos += TYPE_SIZE_TBL.INT8
    return data
}
BufferReader.prototype.uint8 = function(){
    var data = this.buff.readUInt8(this.pos)
    this.pos += TYPE_SIZE_TBL.UINT8
    return data
}

BufferReader.prototype.int16 = function(){
    var data = this.buff.readInt16BE(this.pos)
    this.pos += TYPE_SIZE_TBL.INT16
    return data
}
BufferReader.prototype.uint16 = function(){
    var data = this.buff.readUInt16BE(this.pos)
    this.pos += TYPE_SIZE_TBL.UINT16
    return data
}

BufferReader.prototype.int32 = function(){
    var data = this.buff.readInt32BE(this.pos)
    this.pos += TYPE_SIZE_TBL.INT32
    return data
}
BufferReader.prototype.uint32 = function(){
    var data = this.buff.readUInt32BE(this.pos)
    this.pos += TYPE_SIZE_TBL.UINT32
    return data
}

BufferReader.prototype.int64 = function(){
    var hi = this.buff.readInt32BE(this.pos)
    var lo = this.buff.readUInt32BE(this.pos + TYPE_SIZE_TBL.INT32)
    this.pos += TYPE_SIZE_TBL.INT64
    return [hi,lo]
}
BufferReader.prototype.uint64 = function(){
    var hi = this.buff.readUInt32BE(this.pos)
    var lo = this.buff.readUInt32BE(this.pos + TYPE_SIZE_TBL.UINT32)
    this.pos += TYPE_SIZE_TBL.UINT64
    return [hi,lo]
}
BufferReader.prototype.float = function(){
    var data = this.buff.readFloatBE(this.pos)
    this.pos += TYPE_SIZE_TBL.FLOAT
    return data
}
BufferReader.prototype.double = function(){
    var data = this.buff.readDoubleBE(this.pos)
    this.pos += TYPE_SIZE_TBL.DOUBLE
    return data
}


