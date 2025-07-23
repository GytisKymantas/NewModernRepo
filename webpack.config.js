const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * @MICROFRONTEND
 *
 * Šiuo metu kompiliuojant single-spa aplikaciją galima naudoti
 * išskirtinai tik Webpack, ties Vite palaikymu pagal naujausią
 * informaciją vis dar yra dirbama iš single-spa kūrėjų pusės.
 *
 * Webpack konfigūracija kuriamą išplečiant single-spa pateikiamą
 * bazinę konfigūraciją. Žemiau esantis `merge` metodas leidžia
 * praplėsti bazinę konfigūraciją pagal poreikius.
 *
 * `externals` yra nurodomas projekto priklausomybių prefix'as,
 * kurios neturi būti įtraukiamos į sukompiliuotą kodą.
 * Visos priklausomybės su `@rc-ses` prefix'u, kurios yra
 * `src/@types` kataloge apibrėžia atitinkamų single-spa modulių
 * viešą eksportuojamą funkcionalumą, kurį galima "kviesti" bet
 * kur šioje aplikacijoje norint gauti arba pateikti informaciją
 * atitinkamiems moduliams.
 */
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'rc-ses',
    projectName: 'self-service-provider-demo-react-ui',
    webpackConfigEnv,
    argv,
  });

  const isStandalone = webpackConfigEnv && webpackConfigEnv.standalone;
  const isProduction = argv.mode === 'production';

  return merge(defaultConfig, {
    externals: isStandalone
      ? {}
      : {
          // In microfrontend mode, React should be external
          // In standalone mode, React should be bundled
        },
    plugins: [
      ...(isStandalone
        ? [
            new webpack.ProvidePlugin({
              React: 'react',
            }),
            // Only use HtmlWebpackPlugin for production builds, not dev server
            ...(isProduction
              ? [
                  new HtmlWebpackPlugin({
                    filename: 'index.html',
                    inject: true,
                    template: 'public/index.html',
                  }),
                ]
              : []),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@rc-ses/mfe-host': path.resolve(__dirname, 'modules/mfe-host/index.js'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    watchOptions: {
      // for some systems, watching many files can result in a lot of CPU or memory usage
      // https://webpack.js.org/configuration/watch/#watchoptionsignored
      // don't use this pattern, if you have a monorepo with linked packages
      ignored: /node_modules/,
    },
  });
};
