// 必要なモジュールをインポート
import { Timer } from './timer.js';
import { UI } from './ui.js';

// タイマーアプリケーションのメインクラス
class TimerApp {
    constructor() {
        // Timerクラスのインスタンスを作成
        this.timer = new Timer();
        // UIクラスのインスタンスを作成
        this.ui = new UI();
        // イベントリスナーを設定
        this.bindEvents();
    }

    // イベントリスナーを設定するメソッド
    bindEvents() {
        // スタートボタンのクリックイベントを設定
        document.getElementById('startBtn').addEventListener('click', () => this.startTimer());
        // ストップボタンのクリックイベントを設定
        document.getElementById('stopBtn').addEventListener('click', () => this.stopTimer());
        // リセットボタンのクリックイベントを設定
        document.getElementById('resetBtn').addEventListener('click', () => this.resetTimer());

        // タイマーの毎秒更新時のコールバックを設定
        this.timer.onTick = (remainingSeconds) => this.ui.updateTimerDisplay(remainingSeconds);
        // タイマー完了時のコールバックを設定
        this.timer.onComplete = () => {
            this.ui.playAlarm(); // アラームを鳴らす
            this.ui.updateButtonStates(false, true); // ボタンの状態を更新
        };
    }

    // タイマーを開始するメソッド
    startTimer() {
        // タイマーが動作中でなく、アラームも鳴っていない場合
        if (!this.timer.isActive() && !this.ui.isAlarmActive()) {
            // 入力された時間を取得
            const { hours, minutes, seconds } = this.ui.getInputValues();
            // 合計秒数を計算
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;

            // 時間が設定されていない場合はエラーメッセージを表示
            if (totalSeconds === 0) {
                this.ui.showError('タイマーの時間を設定してください');
                return;
            }

            // タイマーが未設定の場合、新しい時間をセット
            if (this.timer.getRemainingSeconds() === 0) {
                this.timer.setTime(totalSeconds);
            }
            
            // タイマーを開始
            this.timer.start();
            // UIのボタン状態を更新
            this.ui.updateButtonStates(true);
        }
    }

    // タイマーを停止するメソッド
    stopTimer() {
        // アラームが鳴っている場合はアラームを停止
        if (this.ui.isAlarmActive()) {
            this.ui.stopAlarm();
        } else {
            // そうでなければタイマーを停止
            this.timer.stop();
        }
        // UIのボタン状態を更新
        this.ui.updateButtonStates(false);
    }

    // タイマーをリセットするメソッド
    resetTimer() {
        // アラームが鳴っていない場合のみリセット
        if (!this.ui.isAlarmActive()) {
            // タイマーをリセット
            this.timer.reset();
            // 入力フィールドをリセット
            this.ui.resetInputs();
            // タイマー表示を0にリセット
            this.ui.updateTimerDisplay(0);
        }
    }
}

// DOMの読み込みが完了したらTimerAppのインスタンスを作成
document.addEventListener('DOMContentLoaded', () => {
    new TimerApp();
});