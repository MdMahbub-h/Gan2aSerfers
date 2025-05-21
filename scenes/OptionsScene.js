import Phaser from "phaser";

class OptionsScene extends Phaser.Scene {
  soundsOn = true;

  constructor() {
    super({ key: "OptionsScene", active: true });
  }

  create() {
    this.soundsOn = localStorage.getItem("sounds_on") === "true" ? true : false;
    this.gameMusic = this.sound.add("game-music", { loop: true, volume: 0.5 });

    // this.pickCoin = this.createSoundEffect("pickCoin", 0.3, false);
    if (this.soundsOn) {
      this.gameMusic.play();
    }

    this.soundBtn = this.add
      .image(this.scale.width - 25, 10, "sound-on")
      .setScale(0.06)
      .setDepth(4)
      .setOrigin(1, 0)
      .setInteractive({ cursor: "pointer" });

    if (!this.soundsOn) {
      this.gameMusic.setVolume(0);

      this.soundBtn.setTexture("sound-off");
    }

    this.soundBtn.on("pointerup", () => {
      if (this.soundsOn) {
        this.soundsOn = false;
        this.gameMusic.setVolume(0);

        this.soundBtn.setTexture("sound-off");
      } else {
        this.soundsOn = true;
        this.gameMusic.setVolume(0.5);

        this.soundBtn.setTexture("sound-on");
      }
      localStorage.setItem("sounds_on", this.soundsOn);
    });
  }
  enableSoundButton() {
    this.soundBtn.setVisible(true).setInteractive();
  }
  createSoundEffect(soundKey, volumeLevel, loopStatus = false) {
    const effect = this.sound.add(soundKey, { loop: loopStatus });
    effect.volume = volumeLevel;
    return effect;
  }
}

export default OptionsScene;
