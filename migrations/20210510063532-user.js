'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users', {
    columns: {
      id: { type: 'bigint', primaryKey: true, autoIncrement: true },
      firstname: { type : 'string', length : '255', notNull: true },
      lastname: { type : 'string', length : '255', notNull: true },
      email: { type : 'string', length : '255', unique : true, notNull: true },
      password: { type : 'string', length : '255', notNull: true },
      mobile_number: { type : 'string', length : '50'},
      status: { type : 'int', defaultValue : 0},
      created_at : { type : 'datetime'},
      updated_at : { type : 'datetime', defaultValue: new String('CURRENT_TIMESTAMP')}
    },
    ifNotExists: true
  });
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
