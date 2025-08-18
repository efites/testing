const { Before, After, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

Before(async function () {
  await this.init();
});

After(async function ({ result, pickle }) {
  try {
    const isFailed = result && result.status === Status.FAILED;
    if (isFailed && this.page) {
      const buffer = await this.page.screenshot({ type: 'png', fullPage: true });
      if (typeof this.attach === 'function') {
        await this.attach(buffer, 'image/png');
      }
      const dir = path.join(process.cwd(), 'screenshots');
      await fs.promises.mkdir(dir, { recursive: true });
      const name = (pickle && pickle.name) ? pickle.name : 'scenario';
      const safeName = name.replace(/[^\w.-]+/g, '_');
      const filePath = path.join(dir, `${Date.now()}_${safeName}.png`);
      await fs.promises.writeFile(filePath, buffer);
    }
  } finally {
    if (this.browser) {
      await this.browser.close();
    }
  }
});


