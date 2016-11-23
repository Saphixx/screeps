/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('hardCodes');
 * mod.thing == 'a thing'; // true
 */

var hardCodes =
{
    creepBody:
    {
        //300 Energy to work with
        1:
        {
            'harvester': [WORK, CARRY, CARRY, MOVE, MOVE],
            'builder': [WORK, CARRY, CARRY, MOVE, MOVE],
            'upgrader': [WORK, CARRY, CARRY, MOVE, MOVE]
        },
        //550 Energy to work with (5 extenstions at 50 each)
        2:
        {
            'harvester':[WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            'builder':[WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            'upgrader':[WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
        },
        //800 Energy to work with (10 extenstions at 50 each)
        3:
        {
            'harvester':[WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            'builder':[WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            'upgrader':[WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        //1300 Energy to work with (20 extenstions at 50 each)
        4:
        {
            'harvester':[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            'builder':[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            'upgrader':[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        },
        /*
        //1800 Energy to work with (30 extenstions at 50 each)
        5:
        {
            'harvester':,
            'builder':,
            'upgrader':
        },
        //2300 Energy to work with (40 extenstions at 50 each)
        6:
        {
            'harvester':,
            'builder':,
            'upgrader':
        },
        //5300 Energy to work with (50 extenstions at 100 each)
        7:
        {
            'harvester':,
            'builder':,
            'upgrader':
        },
        //12300 Energy to work with (60 extenstions at 200 each)
        8:
        {
            'harvester':,
            'builder':,
            'upgrader':
        }
        */
    },
    
    levelExtensions:
    {
        1: 0,
        2: 5,
        3: 10,
        4: 20,
        5: 30,
        6: 40,
        7: 50,
        8: 60,
    }
};

module.exports = hardCodes;