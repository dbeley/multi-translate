{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    nodePackages.npm
    nodePackages.nodemon
    git
  ];

  shellHook = ''
    echo "Multi-Translate Development Environment"
    echo "========================================"
    echo "Node version: $(node --version)"
    echo "npm version: $(npm --version)"
    echo ""
    echo "Available commands:"
    echo "  npm install  - Install dependencies"
    echo "  npm start    - Start the server"
    echo ""
    echo "To run with auto-reload: nodemon server.js"
    echo ""
  '';
}
