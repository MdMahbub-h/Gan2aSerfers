import Phaser from "phaser";

class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    this.optionsScene = this.game.scene.getScene("OptionsScene");

    this.optionsScene.enableSoundButton();
    this.optionsScene.soundBtn.setDepth(5);

    // this.scene.start("GameScene");

    let bg = this.add
      .image(this.scale.width / 2 + 50, this.scale.height / 2, "welcomebg")
      .setDisplaySize(this.scale.width * 1.1, this.scale.height)
      .setAlpha(0.8);
    let leaf = this.add
      .image(this.scale.width * 0.48, this.scale.height * 0.4, "characters", 1)
      .setDisplaySize(this.scale.width, this.scale.height)
      .setScale(1.3);

    let policeCarLeft = this.add
      .image(this.scale.width / 2 - 110, this.scale.height * 0.6, "carLeft")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setScale(0.3);
    let policeCarRight = this.add
      .image(this.scale.width / 2 + 180, this.scale.height * 0.75, "carRight")
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
    this.playBtn = this.add
      .image(this.scale.width * 0.5, this.scale.height * 0.85, "playbtn")
      .setInteractive({ cursor: "pointer" })
      .setScale(0.4, 0.6);

    this.playBtnText = this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.848, "Play", {
        fontFamily: "Roboto, Arial, sans-serif",
        fontSize: "40px",
        fontStyle: "italic bold",
      })
      .setOrigin(0.5, 0.5);

    this.playBtn.alpha = 0;
    this.playBtnText.alpha = 0;
    this.tweens.add({
      targets: [this.playBtn, this.playBtnText],
      alpha: 1,
      duration: 300,
    });

    let scoreBoxOn = false;
    this.playBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: [this.playBtnText],
        scale: 0.75,
        duration: 100,
      });
      this.tweens.add({
        targets: [this.playBtn],
        scaleX: 0.3,
        scaleY: 0.5,
        duration: 100,
        onComplete: () => {
          this.tweens.add({
            targets: [this.playBtnText],
            scale: 1,
            duration: 100,
          });
          this.tweens.add({
            targets: [this.playBtn],
            scaleX: 0.4,
            scaleY: 0.6,
            duration: 100,
            onComplete: () => {
              if (!scoreBoxOn) {
                this.detailsBox = this.add
                  .image(
                    this.scale.width / 2,
                    this.scale.height / 2.2,
                    "detailsBox"
                  )
                  .setScale(0.5);
                this.playBtnText.setText("Start");
                this.details = this.add
                  .text(
                    this.scale.width / 2,
                    this.scale.height * 0.4,
                    "You have to collect Leaf .\n\n Be aware of Police.",
                    {
                      fontFamily: "Roboto, Arial, sans-serif",
                      fontSize: "30px",
                      fontStyle: "bold",
                    }
                  )
                  .setOrigin(0.5, 0);
                scoreBoxOn = true;
              } else {
                this.tweens.add({
                  targets: [
                    bg,
                    policeCarLeft,
                    policeCarRight,
                    leaf,
                    leaf2,
                    this.playBtn,
                    this.playBtnText,
                    this.detailsBox,
                    this.details,
                  ],
                  alpha: 0, // Fade to invisible
                  duration: 500, // Duration in milliseconds
                  onComplete: () => {
                    this.playBtn.destroy();
                    this.playBtnText.destroy();
                    this.detailsBox.destroy();
                    this.details.destroy();
                    this.scene.start("GameScene");
                    // this.scene.start("EndScene", { score: 100 });
                  },
                });
              }
            },
          });
        },
      });
    });
  }
}

export default StartScene;
