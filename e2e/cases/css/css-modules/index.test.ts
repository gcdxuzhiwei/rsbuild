import { build } from '@e2e/helper';
import { expect, test } from '@playwright/test';

test('should compile CSS Modules correctly', async () => {
  const rsbuild = await build({
    cwd: __dirname,
  });
  const files = await rsbuild.unwrapOutputJSON();

  const content =
    files[Object.keys(files).find((file) => file.endsWith('.css'))!];

  expect(content).toMatch(
    /\.the-a-class{color:red}\.the-b-class-\w{6}{color:blue}\.the-c-class-\w{6}{color:yellow}\.the-d-class{color:green}/,
  );
});

test('should compile CSS Modules follow by output.cssModules', async () => {
  const rsbuild = await build({
    cwd: __dirname,
    rsbuildConfig: {
      output: {
        cssModules: {
          auto: (resource) => {
            return resource.includes('.scss');
          },
        },
      },
    },
  });
  const files = await rsbuild.unwrapOutputJSON();

  const content =
    files[Object.keys(files).find((file) => file.endsWith('.css'))!];

  expect(content).toMatch(
    /.the-a-class{color:red}.the-b-class-\w{6}{color:blue}.the-c-class{color:yellow}.the-d-class{color:green}/,
  );
});

test('should compile CSS Modules follow by output.cssModules custom localIdentName', async () => {
  const rsbuild = await build({
    cwd: __dirname,
    rsbuildConfig: {
      output: {
        cssModules: {
          localIdentName: '[hash:base64:8]',
        },
      },
    },
  });
  const files = await rsbuild.unwrapOutputJSON();

  const content =
    files[Object.keys(files).find((file) => file.endsWith('.css'))!];

  expect(content).toMatch(
    /\.the-a-class{color:red}\.\w{8}{color:blue}\.\w{8}{color:yellow}\.the-d-class{color:green}/,
  );
});

test('should compile CSS Modules follow by output.cssModules custom localIdentName - hashDigest', async () => {
  const rsbuild = await build({
    cwd: __dirname,
    rsbuildConfig: {
      output: {
        cssModules: {
          localIdentName: '[hash:hex:4]',
        },
      },
    },
  });
  const files = await rsbuild.unwrapOutputJSON();

  const content =
    files[Object.keys(files).find((file) => file.endsWith('.css'))!];

  expect(content).toMatch(
    /\.the-a-class{color:red}\.\w{4}{color:blue}\.\w{4}{color:yellow}\.the-d-class{color:green}/,
  );
});
