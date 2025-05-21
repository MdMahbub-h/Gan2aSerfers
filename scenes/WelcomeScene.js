import Phaser from "phaser";
import OptionsScene from "./OptionsScene";

class WelcomeScene extends Phaser.Scene {
  constructor() {
    super("WelcomeScene");
  }
  preload() {
    this.load.image("welcomebg", "/assets/subwaySurfers/bg.png");
    this.load.image("carLeft", "/public/assets/subwaySurfers/carLeft.png");
    this.load.image("carRight", "/public/assets/subwaySurfers/carRight.png");
    this.load.image(
      "largeJoint",
      "/public/assets/subwaySurfers/largeJoint.png"
    );
    this.load.image(
      "mediumJoint",
      "/public/assets/subwaySurfers/mediumJoint.png"
    );
    this.load.image(
      "smallJoint",
      "/public/assets/subwaySurfers/small joint.png"
    );
    this.load.image("handCaff", "/public/assets/subwaySurfers/handcuffs.png");
    this.load.image("smoke", "/public/assets/subwaySurfers/smoke.png");
    this.load.image("fire", "/public/assets/subwaySurfers/fire.png");

    this.load.spritesheet(
      "characters",
      "/public/assets/subwaySurfers/leaf.png",
      {
        frameWidth: 1024 / 4,
        frameHeight: 309,
      }
    );
    this.load.video(
      "gameBg",
      "/public/assets/subwaySurfers/bg.mp4",
      "loadeddata",
      false,
      true
    );

    this.load.image("progress", "/public/assets/progress.png");
    this.load.image("progress2", "/public/assets/progress2.png");
    this.load.image("playbtn", "/public/assets/playBtn.png");
    this.load.image("detailsBox", "/public/assets/descriptionBox.png");

    this.load.audio("game-music", "/public/assets/startSound.mp3");
  }

  create() {
    // this.game.scene.add("OptionsScene", new OptionsScene(), true);
    let bg = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "welcomebg")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setAlpha(0.8);
    let leaf = this.add
      .image(this.scale.width / 2, this.scale.height * 0.4, "characters", 1)
      .setDisplaySize(this.scale.width, this.scale.height)
      .setScale(1);

    let policeCarLeft = this.add
      .image(this.scale.width / 2 - 130, this.scale.height * 0.6, "carLeft")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setScale(0.3);
    let policeCarRight = this.add
      .image(this.scale.width / 2 + 130, this.scale.height * 0.75, "carRight")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setScale(0.7);
    let leaf2 = this.add
      .image(
        this.scale.width / 2 - 190,
        this.scale.height * 0.68,
        "characters",
        1
      )
      .setDisplaySize(this.scale.width, this.scale.height)
      .setScale(0.4);
    let welcomeText = this.add.text(
      this.scale.width / 2 - 350,
      this.scale.height * 0.6,
      "Welcome to Subway Surfers",
      {
        fontFamily: "arial ",
        fontStyle: "bold",
        fontSize: "50px",
        color: "#7fcf00",
        align: "center",
      }
    );
    // this.scene.start("StartScene");
    // this.game.scene.add("OptionsScene", new OptionsScene(), true);

    let width = this.scale.width;
    let height = this.scale.height * 0.9;

    let pwidth = width * 0.69;
    let pheight = 30;

    let progressBox1 = this.add.image(
      this.scale.width / 2,
      this.scale.height * 0.9,
      "progress"
    );
    progressBox1.setDisplaySize(this.scale.width * 0.7, 40);

    let progressBox2 = this.add
      .image(this.scale.width / 2, this.scale.height * 0.9, "progress2")
      .setDepth(3);
    progressBox2.setDisplaySize(this.scale.width * 0.7, 40);
    let progressBar = this.add.graphics();

    let time = 0;
    let timer = this.time.addEvent({
      delay: 20,
      callback: () => {
        progressBar.clear();
        progressBar.fillStyle(0x30a330, 1);
        progressBar.fillRect(
          width / 2 - pwidth / 2 + 2,
          height - pheight / 2,
          pwidth * time,
          pheight
        );
        // phaser = DOMStringList;
        if (time >= 1) {
          this.time.removeEvent(timer);
          this.tweens.add({
            targets: [
              progressBar,
              progressBox1,
              progressBox2,
              welcomeText,
              leaf,
              leaf2,
              policeCarLeft,
              policeCarRight,
            ],
            alpha: 0, // Fade to invisible
            duration: 1000, // Duration in milliseconds
            onComplete: () => {
              progressBar.destroy();
              progressBox1.destroy();
              progressBox2.destroy();
              this.scene.start("StartScene");
              this.game.scene.add("OptionsScene", new OptionsScene(), true);
            },
          });
          this.tweens.add({
            targets: bg,
            alpha: 0.5,
            duration: 500,
            onComplete: () => {
              bg.destroy();
            },
          });
        } else {
          time += 0.01;
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}

export default WelcomeScene;
