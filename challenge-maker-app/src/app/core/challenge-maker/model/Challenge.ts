export class Challenge {
  public static readonly _resource: string = 'challenges';
  get _resource(): string { return Challenge._resource; };

  id: string;
  type: string;
  theme: string;
  value: number;
  attributes: any;

  getQuizQuestions() {
    let questions = [];

    for (let key in this.attributes) {
      if (['astuce','correct', 'wrong'].indexOf(key) < 0) {
        questions.push({
          text: key,
          value: this.attributes[key]
        });
      }
    }

    return questions;
  }
}

