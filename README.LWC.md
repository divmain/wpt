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
# or this
./wpt run --binary "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --install-webdriver --include-file ./lwc/test-list.txt --test-types testharness --skip-timeout chrome --log-html ./report.html | tee /dev/tty 2>&1 > ./stdout.txt
```

Install `chromedriver` if prompted.
