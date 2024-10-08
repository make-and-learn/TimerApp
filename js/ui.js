export class UI {
    constructor() {
        // HTML要素の参照を取得
        this.timerElement = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.hoursInput = document.getElementById('hours');
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        this.alarmAudio = document.getElementById('alarmSound');
        
        // アラームの再生状態を管理するフラグ
        this.isAlarmPlaying = false;

        // UIの初期化
        this.initializeUI();
    }

    // UIの初期状態を設定するメソッド
    initializeUI() {
        this.updateTimerDisplay(0);
        this.updateButtonStates(false);
    }

    // タイマーの表示を更新するメソッド
    updateTimerDisplay(totalSeconds) {
        // 時、分、秒に変換
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        // フォーマットして表示
        this.timerElement.textContent = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }

    // ボタンと入力フィールドの状態を更新するメソッド
    updateButtonStates(isRunning, isAlarmActive = false) {
        // ボタンの有効/無効を設定
        this.startBtn.disabled = isRunning || isAlarmActive;
        this.stopBtn.disabled = !isRunning && !isAlarmActive;
        this.resetBtn.disabled = isRunning || isAlarmActive;
        // 入力フィールドの有効/無効を設定
        [this.hoursInput, this.minutesInput, this.secondsInput].forEach(input => input.disabled = isRunning || isAlarmActive);
    }

    // エラーメッセージを表示するメソッド
    showError(message) {
        alert(message);
    }

    // 入力フィールドの値を取得するメソッド
    getInputValues() {
        return {
            hours: parseInt(this.hoursInput.value, 10) || 0,
            minutes: parseInt(this.minutesInput.value, 10) || 0,
            seconds: parseInt(this.secondsInput.value, 10) || 0
        };
    }

    // 入力フィールドをリセットするメソッド
    resetInputs() {
        this.hoursInput.value = '0';
        this.minutesInput.value = '0';
        this.secondsInput.value = '0';
    }

    // アラーム音を再生するメソッド
    playAlarm() {
        if (this.alarmAudio) {
            this.alarmAudio.loop = true; // ループ再生を設定
            this.alarmAudio.play().catch(error => console.error('Alarm playback failed:', error));
            this.isAlarmPlaying = true;
            this.updateButtonStates(false, true);
        } else {
            console.error('Alarm audio element not found');
        }
    }

    // アラーム音を停止するメソッド
    stopAlarm() {
        if (this.alarmAudio) {
            this.alarmAudio.pause();
            this.alarmAudio.currentTime = 0; // 再生位置を先頭に戻す
            this.isAlarmPlaying = false;
            this.updateButtonStates(false);
        }
    }

    // アラームが鳴っているかどうかを確認するメソッド
    isAlarmActive() {
        return this.isAlarmPlaying;
    }

    // 数字を2桁の文字列に変換するメソッド（例: 1 → "01"）
    padZero(num) {
        return num.toString().padStart(2, '0');
    }
}