// components/countdown/time.js
Component({
  properties: {
    duration: {
      type: Number,
      value: 10,
      observer(newVal) {
        // 仅在新的 duration 值与当前计时器的持续时间不同时重启倒计时
        if (newVal !== this.data.count) {
          this.restartCountdown(newVal);
        }
      }
    },
  },
  data: {
    count: 10,
  },
  lifetimes: {
    attached() {
      this.startCountdown(this.data.duration);
    },
  },
  methods: {
    startCountdown(duration) {
      // 确保计时器是唯一的
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.setData({ count: duration });
      this.timer = setInterval(() => {
        if (this.data.count > 0) {
          this.setData({ count: this.data.count - 1 });
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.triggerEvent('complete');
        }
      }, 1000);
    },
    restartCountdown(newDuration) {
      this.startCountdown(newDuration);
    },
    detached() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  }
});
