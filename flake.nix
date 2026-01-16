{
  description = "Multi Translate - A DeepL translation app";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages = {
          default = pkgs.callPackage ./default.nix { };
          multi-translate = pkgs.callPackage ./default.nix { };
        };

        devShells.default = import ./shell.nix { inherit pkgs; };

        apps.default = {
          type = "app";
          program = "${self.packages.${system}.default}/bin/multi-translate";
        };
      }
    ) // {
      nixosModules.default = import ./module.nix;
      nixosModules.multi-translate = import ./module.nix;
    };
}
