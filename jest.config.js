module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: [
	  "src/**/*.{js,ts}",
	  "!src/**/index.{js,ts}", // Exclua arquivos específicos, se necessário
	  "!src/**/*.d.ts"        // Exclua arquivos de definição
	],
	coverageReporters: ['lcov', 'text']
  };
