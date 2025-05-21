import Phaser from "phaser";

class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }

  create({ score }) {
    this.optionsScene = this.scene.get("OptionsScene");

    let bg = this.add
      .image(this.scale.width / 2, this.scale.height / 3.5, "welcomebg")
      .setDisplaySize(this.scale.width, this.scale.height * 1.8)
      .setAlpha(0.7);

    // Ensure the sound button is visible and interactive
    this.optionsScene.enableSoundButton();
    this.optionsScene.soundBtn.setDepth(5);
    this.scene.bringToTop("OptionsScene");

    let detailsBox = this.add
      .image(this.scale.width / 2, this.scale.height / 2.5, "detailsBox")
      .setScale(0.5);

    this.replayBtn = this.add
      .image(this.scale.width / 2, this.scale.height * 0.85, "playbtn")
      .setInteractive({ cursor: "pointer" })
      .setScale(0.6);

    this.playBtnText = this.add
      .text(this.scale.width / 2, this.scale.height * 0.848, "Play Again", {
        fontFamily: "Roboto, Arial, sans-serif",
        fontSize: "40px",
        fontStyle: "italic bold",
      })
      .setOrigin(0.5, 0.5);

    this.scoreImage = this.add
      .image(this.scale.width / 2 - 80, this.scale.height / 2.1, "smoke")
      .setScale(0.5);

    let scoreText = this.add
      .text(this.scale.width / 2 + 60, this.scale.height / 2.1, score, {
        fontSize: "70px",
        fontStyle: "bold",
        fontFamily: "Arial, sans-serif",
      })
      .setOrigin(0.5, 0.5);
    let winText = this.add
      .text(this.scale.width / 2, this.scale.height / 2.8, "Game Over", {
        fontSize: "50px",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.replayBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: [this.playBtnText],
        scale: 0.75,
        duration: 100,
      });
      this.tweens.add({
        targets: [this.replayBtn],
        scale: 0.5,
        duration: 100,
        onComplete: () => {
          this.tweens.add({
            targets: [this.playBtnText],
            scale: 1,
            duration: 100,
          });
          this.tweens.add({
            targets: [this.replayBtn],
            scale: 0.6,
            duration: 100,
            onComplete: () => {
              this.tweens.add({
                targets: [
                  bg,
                  detailsBox,
                  this.replayBtn,
                  this.playBtnText,
                  scoreText,
                  winText,
                ],
                alpha: 0, // Fade to invisible
                duration: 500,
                onComplete: () => {
                  bg.destroy();
                  detailsBox.destroy();
                  this.replayBtn.destroy();
                  this.playBtnText.destroy();
                  scoreText.destroy();
                  winText.destroy();

                  this.scene.start("StartScene");
                },
              });
            },
          });
        },
      });
    });
  }
}

export default EndScene;
