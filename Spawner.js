/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Spawner');
 * mod.thing == 'a thing'; // true
 */
var hardCode = require('hardCodes');
Memory.totalCreeps = 100;

var Spawner =
{
    canSpawn: function(maxCreeps)
    {
        if(Object.keys(Game.creeps).length < maxCreeps)
        {
            var role       = getRole();
            var spawnLevel = getSpawningLevel();
            
            if(Memory.totalCreeps < 1 && !Game.spawns['Spawn1'].canCreateCreep(hardCode.creepBody[1][role], undefined))
            {
                Memory.newRole  = role;
                Memory.newLevel = 1;
                
                return true;
            }
            
            if (!Game.spawns['Spawn1'].canCreateCreep(hardCode.creepBody[spawnLevel][role], undefined))
            {
                Memory.newRole  = role;
                Memory.newLevel = spawnLevel;
                
                return true;
            }
        }
        
        return false;
    },
    
    spawn: function() 
    {
        var role       = Memory.newRole;
        var spawnLevel = Memory.newLevel;
        
        var newName = Game.spawns['Spawn1'].createCreep(hardCode.creepBody[spawnLevel][role], {role: role, roomID: Game.spawns['Spawn1'].room.name});
        console.log('Spawning new ' + role + ': ' + newName);
        console.log('With body: ' + hardCode.creepBody[spawnLevel][role]);
    }
};

function getSpawningLevel()
{
    var extensionCount = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
        
    }).length;
    
    if (extensionCount < 5)
    {
        return 1;
    }
    else if (extensionCount < 10)
    {
        return 2;
    }
    else if (extensionCount < 20)
    {
        return 3;
    }
    else if (extensionCount < 30)
    {
        return 4;
    }
    else if (extensionCount < 40)
    {
        return 5;
    }
    else if (extensionCount < 50)
    {
        return 6;
    }
    else if (extensionCount < 60)
    {
        return 7;
    }
    else
    {
        return 8;
    }
}

function getRole()
{
    var harvesterCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
    var builderCount   = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
    var upgraderCount  = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
    
    Memory.totalCreeps = harvesterCount + builderCount + upgraderCount;
    Memory.currentHarvesters = harvesterCount;
    Memory.currentBuilders   = builderCount;
    Memory.currentUpgraders  = upgraderCount;

    if(harvesterCount < Memory.constants.MAXHARVESTERS)
    {
        return 'harvester';
    }
    if(builderCount < Memory.constants.MAXBUILDERS)
    {
        return 'builder';
    }
//    if(upgraderCount < 2)
//    {
        return 'upgrader';
//    }
}

module.exports = Spawner;