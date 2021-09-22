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

To refresh tests from master and re-inject LWC synthetic-shadow:

```bash
npm install
npm install @lwc/synthetic-shadow@DESIRED_VERSION
npm run inject-synthetic-shadow
cat node_modules/@lwc/synthetic-shadow/dist/synthetic-shadow.js | sed 's/process.env.NODE_ENV/"production"/g' > ./resources/synthetic-shadow.js
cp node_modules/@lwc/synthetic-shadow/dist/synthetic-shadow.js ./resources/
```

Run tests:

```bash
# First with the synthetic shadow polyfill present.
./wpt run --binary "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --test-types testharness --skip-timeout chrome --log-wptreport="./lwc/reports/report-synthetic-shadow-$(date +%s).json" --headless --processes=6
# Then without the polyfill
git checkout master
./wpt run --binary "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --test-types testharness --skip-timeout chrome --log-wptreport="./lwc/reports/report-master-$(date +%s).json" --headless --processes=6
```

To generate a report:

```bash
node ./lwc/generate-report.js ./lwc/reports/report-master-DATE.json ./lwc/reports/report-synthetic-shadow-DATE.json > ./report.html
```

To run tests manually:

```bash
./wpt serve
```

Then select [a test](http://web-platform.test:8000/).

