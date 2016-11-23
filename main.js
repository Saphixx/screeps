var roleHarvester = require('harvester');
var roleUpgrader  = require('upgrader');
var roleBuilder   = require('builder');
var spawner       = require('Spawner');

Memory.constants = {MAXCREEPS: 100, MAXHARVESTERS: 8, MAXBUILDERS: 10};

Memory.roads         = {sTE: 0, sfE: 0, sTC: 0, sFC: 0};

module.exports.loop = function () 
{
    //Tower code for later use
    var tower = Game.getObjectById('f594edc081ddd4b89bb21267');
    if(tower) 
    {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) 
        {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) 
        {
            tower.attack(closestHostile);
        }
    }
    /*
    //Create road
    var spawn = Game.spawns['Spawn1'];
    
    var path = spawn.room.findPath(spawn.pos, spawn.room.find(FIND_SOURCES)[0].pos, {ignoreCreeps: true});
    var path2 = spawn.room.findPath(spawn.pos, spawn.room.find(FIND_SOURCES)[1].pos, {ignoreCreeps: true});
    
    for(var i = 0; i < path.length; ++i)
    {
        spawn.room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
    }
    
    for(var i = 0; i < path2.length; ++i)
    {
        spawn.room.createConstructionSite(path2[i].x, path2[i].y, STRUCTURE_ROAD);
    }
    */
    /*
    //Create extensions around sources
    var spawn = Game.spawns['Spawn1'];
    
    if (spawn.room.controller.level > 1)
    {
        Memory.structs = spawn.room.find(FIND_MY_STRUCTURES);
        var extensionCount = 0;
        
        for(var i = 0; i < Memory.structs.length; ++i)
        {
            console.log(Memory.structs[i].structureType);
            if(Memory.structs[i].structureType == STRUCTURE_EXTENSION)
            {
                extensionCount++;
            }
        }
        
        if(extensionCount < 5)
        {
            
            var sources = spawn.room.find(FIND_SOURCES);
            var index = Math.floor(Math.random() * 2);
            Memory.sourcePos = sources[index].pos;
            
            Memory.sourcePos.x -= 3;
            Memory.sourcePos.y -= 3;
            
            for (var a = Memory.sourcePos.x - 3; a <= Memory.sourcePos.x + 6; a += 3)
            {
                for (var b = Memory.sourcePos.y - 3; b <= Memory.sourcePos.y + 6; b += 3)
                {
                    if(spawn.room.lookAt(a, b).length < 2)
                    {
                        spawn.room.createConstructionSite(a, b, STRUCTURE_EXTENSION);
                        a += 10;
                        b += 10;
                    }
                }
            }
            
        }
    }*/
    
    //Clean up dead creep
    for(var name in Memory.creeps) 
    {
        if(!Game.creeps[name]) 
        {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    //Autospawning
    /*
    if (Object.keys(Game.creeps).length < Memory.totalCreeps && !Game.spawns['Spawn1'].canCreateCreep([WORK,CARRY,MOVE], undefined))
    {
        var role = getRole();

        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], {role: role, roomID: Game.spawns['Spawn1'].room.name});
        console.log('Spawning new ' + role + ': ' + newName);
    }*/
    
    //Better Autospawning
    if(spawner.canSpawn(Memory.constants.MAXCREEPS))
    {
        spawner.spawn();
    }
    
    //Show population
    if(Game.time % 100 == 0)
    {
        console.log('On tick: ' + Game.time);
        console.log('Harvesters: ' + Memory.currentHarvesters);
        console.log('Builder   : ' + Memory.currentBuilders);
        console.log('Upgrader  : ' + Memory.currentUpgraders);    
    }

    for(var name in Game.creeps) 
    {
        var creep = Game.creeps[name];
        //console.log(creep.memory.role);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}