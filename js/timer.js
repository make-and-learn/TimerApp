export class Timer {
    constructor() {
        // setIntervalの戻り値を保持するための変数
        this.intervalId = null;
        // 残り時間（秒）
        this.remainingSeconds = 0;
        // タイマーが動作中かどうかのフラグ
        this.isRunning = false;
        // 毎秒の更新時に呼び出されるコールバック関数
        this.onTick = null;
        // タイマー完了時に呼び出されるコールバック関数
        this.onComplete = null;
    }

    // タイマーを開始するメソッド
    start() {
        // すでに動作中の場合は何もしない
        if (this.isRunning) return;

        // タイマーを動作中に設定
        this.isRunning = true;
        // 1秒ごとにtickメソッドを呼び出す
        this.intervalId = setInterval(() => this.tick(), 1000);
    }

    // タイマーを停止するメソッド
    stop() {
        // 動作中でない場合は何もしない
        if (!this.isRunning) return;

        // タイマーを停止状態に設定
        this.isRunning = false;
        // setIntervalをクリア
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    // タイマーをリセットするメソッド
    reset() {
        // タイマーを停止
        this.stop();
        // 残り時間を0にリセット
        this.remainingSeconds = 0;
        // 更新を通知
        this.notifyTick();
    }

    // 1秒ごとに呼び出されるメソッド
    tick() {
        if (this.remainingSeconds > 0) {
            // 残り時間がある場合は1秒減らす
            this.remainingSeconds--;
            // 更新を通知
            this.notifyTick();
        } else {
            // 残り時間が0になったらタイマーを停止し、完了を通知
            this.stop();
            this.notifyComplete();
        }
    }

    // タイマーの時間を設定するメソッド
    setTime(seconds) {
        this.remainingSeconds = seconds;
        // 更新を通知
        this.notifyTick();
    }

    // 残り時間を取得するメソッド
    getRemainingSeconds() {
        return this.remainingSeconds;
    }

    // タイマーが動作中かどうかを確認するメソッド
    isActive() {
        return this.isRunning;
    }

    // 更新を通知するメソッド
    notifyTick() {
        // onTickが関数として設定されている場合に呼び出す
        if (typeof this.onTick === 'function') {
            this.onTick(this.remainingSeconds);
        }
    }

    // タイマー完了を通知するメソッド
    notifyComplete() {
        // onCompleteが関数として設定されている場合に呼び出す
        if (typeof this.onComplete === 'function') {
            this.onComplete();
        }
    }
}