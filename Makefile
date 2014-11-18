test:
	@node node_modules/lab/bin/lab -m 5000 -L
test-cov:
	@node node_modules/lab/bin/lab -m 5000 -t 100 -L
test-cov-html:
	@node node_modules/lab/bin/lab -m 5000 -r html -o coverage.html

.PHONY: test test-cov test-cov-html