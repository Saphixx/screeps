/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

function dist(pos1, pos2)
{
    return Math.hypot(Math.abs(pos1.x - pos2.x), Math.abs(pos1.y - pos2.y));
}

var roleHarvester = 
{
    /** @param {Creep} creep **/
    run: function(creep) 
    {
        if(creep.memory.harvesting == true)
        {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
            
            if(creep.carry.energy == creep.carryCapacity)
            {
                creep.memory.harvesting = false;
            }
        }
        else
        {
            var targets = null;
            
            if(creep.carry.energy < 50)
            {
                creep.memory.harvesting = true;
            }
            else if (creep.carry.energy < creep.carryCapacity)
            {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                    }
                });
                
                if(targets.length == 0)
                {
                    creep.memory.harvesting = true;
                }
            }
            else
            {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
            }
            
            if(targets == null)
            {
                return;
            }
            
            if(targets.length < 2)
            {
                creep.moveTo(19,16);
            }
            
            try
            {
                var lowestVal = dist(creep.pos, targets[0].pos);
            }
            catch(err)
            {
                return;
                console.log(err.message);
            }
            var lowest    = 0;
            
            for(var i = 1; i < targets.length; ++i)
            {
                var newVal = dist(creep.pos, targets[i].pos);

                if(lowestVal > newVal)
                {
                    lowestVal = newVal;
                    lowest = i;
                }
            }

            if(creep.transfer(targets[lowest], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(targets[lowest]);
            }
        }
        /*
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            
            //If there is nowhere to take the energy to
            if(targets.length == 0)
            {
                return;
            }
            
            var lowestVal = dist(creep.pos, targets[0].pos);
            var lowest    = 0;
            
            for(var i = 1; i < targets.length; ++i)
            {
                var newVal = dist(creep.pos, targets[i].pos);

                if(lowestVal > newVal)
                {
                    lowestVal = newVal;
                    lowest = i;
                }
            }
            
            if(targets.length > 0) {
                if(creep.transfer(targets[lowest], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[lowest]);
                }
            }
            else
            {
                creep.moveTo(27,8);
            }
        }*/
        
        if(creep.room.name != creep.memory.roomID)
        {
            console.log(creep.name + ' got lost.');
            creep.moveTo(Game.rooms[creep.memory.roomID].controller.pos);
        }
        
    }
};

module.exports = roleHarvester;