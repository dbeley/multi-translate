with import <nixpkgs> { };

pkgs.mkShell {
  buildInputs = [
    nodejs
  ];

}
