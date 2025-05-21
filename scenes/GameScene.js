import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.optionsScene = this.scene.get("OptionsScene");
    // this.scene.start("EndScene");
    this.score = 0;
    this.life = 3;
    this.speed = 1.5;

    this.level = 1;

    let video = this.add.video(
      this.scale.width * 0.56,
      this.scale.height / 2,
      "gameBg"
    );
    video.play(true);
    video.setScale(2);
    video.setLoop(true);
    video.video.playbackRate = 1.0;

    this.head = this.physics.add
      .image(this.scale.width * 0.48, this.scale.height * 0.9, "smallJoint")
      .setScale(0.6)
      .setSize(180, 70)
      .setDepth(5)
      .setAngle(-20);

    this.createEmitters();

    this.scoreImage = this.add
      .image(this.scale.width * 0.23, this.scale.height * 0.14, "smoke")
      .setScale(0.5);
    this.scoreText = this.add.text(
      this.scale.width * 0.28,
      this.scale.height * 0.1,
      this.score,
      {
        fontSize: "70px",
        color: "yellow",
        fontStyle: "bold", // Make text bold
        fontFamily: "Arial", // Optional: ensure a standard bold-capable font
      }
    );

    this.lifeImage = this.add
      .image(this.scale.width * 0.65, this.scale.height * 0.16, "carLeft")
      .setScale(0.35);
    this.lifeText = this.add.text(
      this.scale.width * 0.7,
      this.scale.height * 0.1,
      this.life,
      {
        fontSize: "70px",
        color: "yellow",
        fontStyle: "bold", // Make text bold
        fontFamily: "Arial", // Optional: ensure a standard bold-capable font
      }
    );

    this.moveDelay = 100;
    this.lastMoveTime = 0;

    this.oldPositions = [];

    this.createItem();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.direction = "RIGHT";
  }

  createEmitters() {
    this.emitter = this.add
      .particles(this.head.x + 28, this.head.y - 18, "smoke", {
        scale: { start: 0.2, end: 0.0 },
        alpha: { start: 0.5, end: 0 },
        speedY: { min: -20, max: -120 },
        speedX: { min: -50, max: 50 },
        lifespan: 800,
        frequency: 10,
        angle: { min: -30, max: 30 },
        quantity: 1,
      })
      .setDepth(6);
    this.emitter.particleBringToTop = false;
  }

  createItem() {
    if (Math.random() * 10 > 5) {
      this.createLeaf();
    } else {
      this.createCar();
    }
    setTimeout(() => {
      if (!this.isGameOver) {
        this.createItem();
      }
    }, Math.random() * 2000 + 1000 * this.speed);
  }

  createLeaf() {
    let item = this.physics.add
      .image(this.scale.width * 0.53, this.scale.height * 0.56, "characters", 1)
      .setScale(0.01)
      .setSize(100, 50);
    this.physics.world.enable(item);

    let direction = 1;
    let random = Math.random() * 10;
    if (random > 6.66) {
      direction = 2;
      item.x = this.scale.width * 0.5;
    } else if (random > 3.33) {
      direction = 3;
      item.x = this.scale.width * 0.51;
    } else {
      item.x = this.scale.width * 0.49;
    }

    let speedObj = { value: 0 };
    let incSpeed = 1;
    let itemTween = this.tweens.add({
      targets: speedObj,
      value: 100,
      duration: 25000,
      ease: "Linear",
      onUpdate: () => {
        if (item) {
          item.setVelocityY((speedObj.value + incSpeed) * this.speed);
          incSpeed += 0.5;
        }
      },
    });
    let itemTween2 = null;
    if (direction == 1) {
      let speedObj2 = { value: 0 };
      itemTween2 = this.tweens.add({
        targets: speedObj2,
        value: 40,
        duration: 15000,
        ease: "Linear",
        onUpdate: () => {
          if (item) {
            item.setVelocityX(-(speedObj2.value + incSpeed) * this.speed);
          }
        },
      });
    } else if (direction == 3) {
      let speedObj2 = { value: 0 };
      itemTween2 = this.tweens.add({
        targets: speedObj2,
        value: 40,
        duration: 15000,
        ease: "Linear",
        onUpdate: () => {
          if (item) {
            item.setVelocityX((speedObj2.value + incSpeed) * this.speed);
          }
        },
      });
    }

    this.tweens.add({
      targets: item,
      scale: 0.7,
      duration: 15000 / this.speed,
      ease: "Linear",
      repeat: 0,
    });

    this.physics.add.overlap(
      this.head,
      item,
      () => {
        this.score += 1;
        this.scoreText.setText(this.score * 10);
        if (this.score > 10) {
          this.level = 3;
          this.head.setTexture("largeJoint");
          this.emitter.y = this.head.y - 25;
        } else if (this.score > 5) {
          this.level = 2;
          this.head.setTexture("mediumJoint");
        }
        if (this.score > 20) {
          this.emitter.setTexture("fire");
        }

        itemTween.destroy();
        item.destroy();
        if (itemTween2) {
          itemTween2.destroy();
        }
      },
      null,
      this
    );
  }
  createCar() {
    let item = this.physics.add
      .image(this.scale.width * 0.48, this.scale.height * 0.555, "carLeft")
      .setScale(0.05)
      .setSize(150, 50);
    this.physics.world.enable(item);

    let direction = 1;
    let random = Math.random() * 10;
    if (random > 6.66) {
      direction = 2;
      item.x = this.scale.width * 0.495;
    } else if (random > 3.33) {
      direction = 3;
      item.x = this.scale.width * 0.51;
      item.setTexture("carRight");
    } else {
      item.x = this.scale.width * 0.48;
    }

    let incSpeed = 1;
    let speedObj = { value: 0 };
    let itemTween = this.tweens.add({
      targets: speedObj,
      value: 80,
      duration: 20000,
      ease: "Linear",
      onUpdate: () => {
        item.setVelocityY((speedObj.value + incSpeed) * this.speed);

        incSpeed += 0.5;
      },
    });
    let itemTween2 = null;
    if (direction == 1) {
      let speedObj2 = { value: 0 };
      itemTween2 = this.tweens.add({
        targets: speedObj2,
        value: 50,
        duration: 15000,
        ease: "Linear",
        onUpdate: () => {
          item.setVelocityX(-(speedObj2.value + incSpeed) * this.speed);
        },
      });
    } else if (direction == 3) {
      let speedObj2 = { value: 0 };
      itemTween2 = this.tweens.add({
        targets: speedObj2,
        value: 50,
        duration: 15000,
        ease: "Linear",
        onUpdate: () => {
          item.setVelocityX((speedObj2.value + incSpeed) * this.speed);
        },
      });
    }

    this.tweens.add({
      targets: item,
      scale: 1.5,
      duration: 20000 / this.speed,
      ease: "Linear",
      repeat: 0,
    });

    let collide = false;

    this.physics.add.overlap(
      this.head,
      item,
      () => {
        if (!collide) {
          collide = true;
          this.life -= 1;
          this.lifeText.setText(this.life);
          if (this.life == 0) {
            this.gameOver();
          }
        }
      },
      null,
      this
    );
    setTimeout(() => {
      if (item) {
        itemTween.destroy();
        item.destroy();
        if (itemTween2) {
          itemTween2.destroy();
        }
      }
    }, 20000);
  }

  update(time, delta) {
    let speed = 10;
    if (this.cursors.left.isDown) this.direction = "LEFT";
    else if (this.cursors.right.isDown) this.direction = "RIGHT";
    else if (this.cursors.up.isDown) this.direction = "UP";
    else if (this.cursors.down.isDown) this.direction = "DOWN";
    else this.direction = null;

    if (this.direction === "LEFT" && this.head.x > this.scale.width * 0.25) {
      this.head.x -= speed;
    } else if (
      this.direction === "RIGHT" &&
      this.head.x < this.scale.width * 0.75
    ) {
      this.head.x += speed;
    }

    this.emitter.x = this.head.x + 28 * this.level;
  }

  gameOver() {
    this.isGameOver = true;
    this.handCaff = this.add.image(
      this.scale.width / 2,
      this.scale.height * 0.5,
      "handCaff"
    );

    this.cameras.main.fadeOut(1500);
    setTimeout(() => {
      this.scene.start("EndScene", { score: this.score * 10 });
    }, 1500);
  }
}

export default GameScene;
