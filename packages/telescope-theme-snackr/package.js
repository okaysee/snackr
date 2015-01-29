Package.describe({
  summary: "Telescope snackr theme",
  version: '0.1.0',
  name: "telescope-theme-snackr"
});

Package.onUse(function (api) {

  api.use(['fourseven:scss', 'telescope-theme-hubble'], ['client']);

  api.addFiles([
    'lib/client/stylesheets/screen.scss',
    ], ['client']);

});