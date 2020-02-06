class ModulePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let {prodConfig} = this.options;
    compiler.plugin('emit', (compilation, next) => {
      // console.log(compilation.entrypoints)
      let css = [];
      let js = [];
      compilation.entrypoints.forEach(compiler => {
        // console.log({compiler})
        for (const chunkKey of Object.keys(compiler.chunks)) {
          const chunk = compiler.chunks[chunkKey];
          for (const fileKey of Object.keys(chunk.files)) {
            
            const file = prodConfig.output.publicPath + '/' + chunk.files[fileKey]
            if (/\.js$/i.test(file)) {
              js.push(file);
            } else if (/\.css$/i.test(file)) {
              css.push(file);
            }
          }
        }
      })
      let moduleJson = `_AIRMODULE.autoCompleteDoc(${JSON.stringify({
        css,
        js
      })})`;

      compilation.assets[`module/module.js`] = {
        size() {
          return moduleJson.length;
        },
        source() {
          return moduleJson;
        }
      };
      // console.log({css, js, prodConfig})
      next();
    });
  }
}

module.exports = ModulePlugin;
