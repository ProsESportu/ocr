import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import * as tf from "@tensorflow/tfjs";
import { DrawableDirective } from './drawable.directive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ocr';
  predictions: any[]
  model: tf.LayersModel[]
  answear: string = "nope"
  ansNum: number
  chosen_model = new FormControl(0)
  by_merge_map = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'd', 'e',
    'f', 'g', 'h', 'n', 'q', 'r', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  @ViewChild(DrawableDirective) canvas;

  async ngOnInit() {
    await this.loadModel()
  }
  async loadModel() {
    this.model =
      await Promise.all([
        tf.loadLayersModel("/assets/model.json"),
        tf.loadLayersModel("/assets/dig/model2.json")
      ])
  }
  async predict(imageData: ImageData) {

    await tf.tidy(() => {

      // Convert the canvas pixels to a Tensor of the matching shape
      let img = tf.browser.fromPixels(imageData, 1);
      img = this.chosen_model.value == 0 ? img.reshape([1, 28, 28, 1]) : img.reshape([1, 28, 28,]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = this.model[this.chosen_model.value].predict(img) as any;

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync());
      this.answear = this.by_merge_map[this.predictions.indexOf(Math.max.apply(Math, this.predictions))]
      this.ansNum = this.predictions.indexOf(Math.max.apply(Math, this.predictions))
    });

  }
}
