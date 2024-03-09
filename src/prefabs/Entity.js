class Entity extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, _name='unkown', _hitPoints=100){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        //forced update
        scene.events.on('update', this.update, this)

        //physical properties
        this.VELOCITY = 100
        this.setCollideWorldBounds(true)
        this.setScale(2.5)   
        this.setInteractive()

        //nonphysical
        this.parentScene = scene
        this.entity_type = _name
        this.detectionDistance = 100

        //health
        this.isAlive = true
        this.HIT_POINTS = _hitPoints
        this.HIT_POINTS_log = _hitPoints //this way we can reset it

        //timing, reset
        this.INTERVAL_ID = undefined
        this.reset_e = true
        this.canMove = true
        this.entity_text = scene.add.text(this.x, this.y, this.entity_type, {fill: '#FFFFFF'}).setAlpha(0) //nameplate 


        //damage dealing properties
        this.lightAttack_dmg = undefined
        this.heavyAttack_dmg = undefined

        //everything collifes with enemies
        scene.physics.add.overlap(this, scene.enemies, (object, enemy)=>{
            //console.log(`collision between ${this.entity_type} and an enemy`)
            this.handleCollision(enemy)
        })



        this.on('pointerdown', ()=>{
            console.log(`entity-click ${this.entity_type}`)
            this.handleClick()
        })  
    }


    //derived classes override this
    handleCollision(){}
    handleClick(){}

    update(){
    }

    getPosition(){
        return [this.x, this.y]
    }

    getVelocity(){
        return [this.body.velocity.x, this.body.velocity.y]
    }

    updateNamePlate(){
        this.entity_text.x = this.x
        this.entity_text.y = this.y
    }
}