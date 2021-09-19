# TODO

Setup local machine to run tests (macOS):

```bash
# configure python tools
python -m ensurepip --user
export PATH="$PATH:$HOME/Library/Python/2.7/bin"
pip install --user virtualenv

# configure hosts file
sudo -n true && ./wpt make-hosts-file | sudo tee -a /etc/hosts
```

Inject LWC synthetic-shadow:

```bash
npm install
npm install @lwc/synthetic-shadow@DESIRED_VERSION
npm run inject-synthetic-shadow
cat node_modules/@lwc/synthetic-shadow/dist/synthetic-shadow.js | sed 's/process.env.NODE_ENV/"production"/g' > ./resources/synthetic-shadow.js
cp node_modules/@lwc/synthetic-shadow/dist/synthetic-shadow.js ./resources/
```

Run tests:

```bash
./wpt run chrome [tests]
# OR
./wpt run chrome
```

If the script can't find your Chrome binary, try:

```bash
# this
./wpt run --binary "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --install-webdriver --test-types testharness --skip-timeout chrome --log-html ./report.html | tee /dev/tty 2>&1 > ./stdout.txt
# without worker tests (which all time out)
./wpt run --binary "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --install-webdriver --include-file ./lwc/test-list.txt --test-types testharness --skip-timeout chrome --log-html ./report.html | tee /dev/tty 2>&1 > ./stdout.txt
# maybe better?
./wpt run --binary "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --test-types testharness --skip-timeout chrome --log-wptreport=report.json --log-wptscreenshot=screenshots.txt --headless --processes=6 | tee /dev/tty 2>&1 > ./stdout.txt
```

Install `chromedriver` if prompted.

Run tests manually:

```bash
./wpt serve
```

Then run [a test](http://web-platform.test:8000/).

