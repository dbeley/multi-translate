{ config, lib, pkgs, ... }:

with lib;

let
  cfg = config.services.multi-translate;
in
{
  options.services.multi-translate = {
    enable = mkEnableOption "Multi Translate service";

    port = mkOption {
      type = types.port;
      default = 3000;
      description = "Port on which the multi-translate server will listen";
    };

    apiKey = mkOption {
      type = types.str;
      description = "DeepL API key";
    };

    apiUrl = mkOption {
      type = types.str;
      default = "https://api-free.deepl.com/v2";
      description = "DeepL API URL (use https://api.deepl.com/v2 for pro)";
    };

    user = mkOption {
      type = types.str;
      default = "multi-translate";
      description = "User account under which multi-translate runs";
    };

    group = mkOption {
      type = types.str;
      default = "multi-translate";
      description = "Group under which multi-translate runs";
    };

    package = mkOption {
      type = types.package;
      default = pkgs.callPackage ./default.nix {};
      defaultText = literalExpression "pkgs.callPackage ./default.nix {}";
      description = "The multi-translate package to use";
    };
  };

  config = mkIf cfg.enable {
    systemd.services.multi-translate = {
      description = "Multi Translate DeepL Translation Service";
      wantedBy = [ "multi-user.target" ];
      after = [ "network.target" ];

      environment = {
        API_KEY = cfg.apiKey;
        API_URL = cfg.apiUrl;
        PORT = toString cfg.port;
      };

      serviceConfig = {
        Type = "simple";
        User = cfg.user;
        Group = cfg.group;
        ExecStart = "${cfg.package}/bin/multi-translate";
        Restart = "on-failure";
        RestartSec = "5s";

        # Security hardening
        NoNewPrivileges = true;
        PrivateTmp = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        ReadOnlyPaths = "/";
        ReadWritePaths = [ ];
      };
    };

    users.users.${cfg.user} = mkIf (cfg.user == "multi-translate") {
      isSystemUser = true;
      group = cfg.group;
      description = "Multi Translate service user";
    };

    users.groups.${cfg.group} = mkIf (cfg.group == "multi-translate") {};
  };
}
