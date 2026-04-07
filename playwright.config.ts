/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';


const LT_USERNAME = process.env.LT_USERNAME 
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY


const getLtOptions = (platform: string, browserName: string, browserVersion: string) => {
  let ltBrowserName = browserName.toLowerCase();
  
  if (ltBrowserName === 'firefox') ltBrowserName = 'pw-firefox';
  if (ltBrowserName === 'webkit' || ltBrowserName === 'safari') ltBrowserName = 'pw-webkit';
  if (ltBrowserName === 'chrome' || ltBrowserName === 'chromium') ltBrowserName = 'pw-chromium';

  const capabilities = {
    'browserName': ltBrowserName,
    'browserVersion': browserVersion,
    'LT:Options': {
      'platform': platform,
      'build': 'TestMu-Parallel-Build',
      'name': `Test-${browserName}-${platform}`,
      'user': LT_USERNAME,
      'accessKey': LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'visual': true,
      'console': true,
      'plugin': 'node_js'
    }
  };
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
};


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',

  projects: [
    {
      name: 'chrome:windows',
      use: {
        connectOptions: {
         
          wsEndpoint: getLtOptions('Windows 10', 'chrome', 'latest')
        }
      },
    },
    {
      name: 'firefox:macos',
      use: {
        connectOptions: {
          wsEndpoint: getLtOptions('MacOS Catalina', 'firefox', 'latest')
        }
      },
    },
  ],

  use: {
    screenshot: 'on',
    video: 'off', 
    trace: 'on',
  },
});