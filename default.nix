{ lib
, stdenv
, nodejs
, fetchFromGitHub
, buildNpmPackage
}:

buildNpmPackage rec {
  pname = "multi-translate";
  version = "1.0.0";

  src = ./.;

  npmDepsHash = "sha256-w0zPBBXODAE9GnWaPE8AuxfU+BCYJnO306kUVfAHLBI=";

  # The install phase copies the necessary files
  installPhase = ''
    runHook preInstall

    mkdir -p $out/lib/multi-translate
    mkdir -p $out/bin

    # Copy application files
    cp -r node_modules $out/lib/multi-translate/
    cp package.json $out/lib/multi-translate/
    cp package-lock.json $out/lib/multi-translate/
    cp server.js $out/lib/multi-translate/
    cp app.js $out/lib/multi-translate/
    cp index.html $out/lib/multi-translate/
    cp -r imgs $out/lib/multi-translate/

    # Create a wrapper script
    cat > $out/bin/multi-translate <<EOF
    #!${stdenv.shell}
    cd $out/lib/multi-translate
    exec ${nodejs}/bin/node server.js "\$@"
    EOF
    chmod +x $out/bin/multi-translate

    runHook postInstall
  '';

  meta = with lib; {
    description = "A simple client-side translation app built with Vue 3 and Tailwind CSS using DeepL API";
    homepage = "https://github.com/yourusername/multi-translate";
    license = licenses.isc;
    maintainers = [ ];
    platforms = platforms.linux;
  };
}
