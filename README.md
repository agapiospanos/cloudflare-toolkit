# Cloudflare Toolkit v1.0
This is a basic toolkit for cloudflare. Until now, it performs 5 basic tasks:
* Lists all zones of your account
* Replaces ip with another ip for all dns records of all zones
* Replaces ip with another ip for all dns records of a zone
* Replaces ip with another ip for all dns records of a domain name
* Sets proxy status (proxied or only dns) for a domain (with option to set only the main a record and www record)
* Sets proxy status (proxied or only dns) for all zones
* Deletes moved (not in cloudflare anymore) zones

In the future I may include more functionalities. However, it is really easy to extend it yourself.

This project was developed as a helper for my personal cloudflare account. I used it to replace all IPs from old server to point to the new server IP once I migrated to a new server. Then I also used it to delete all leftover accounts that were no longer in cloudflare.

This software is provided as is. I do not hold any responsibility for any misuse or malfunction of it that may cause undesired changes to your cloudflare account or settings.

## How to use:
1. clone the repo
2. install node modules by running
```npm ci```
3. rename file ```src/credentials.template.ts``` to ```src/credentials.ts```
4. replace the ```apiKey``` and ```email``` in ```credentials.ts``` file
5. run one of the following commands
    * ```npm run list-zones```
    * ```npm run replace-ip-for-all-zones <source_ip> <target_ip>```
    * ```npm run replace-ip-for-domain <source_ip> <target_ip> example.com```
    * ```npm run replace-ip-for-zone <source_ip> <target_ip> <zone_id>```
    * ```npm run set-proxy-status-for-all-zones <enable_proxy(true|false)> <only_for_site(true|false -> optional default is false)>```
    * ```npm run set-proxy-status-for-domain <domain> <enable_proxy(true|false)> <only_for_site(true|false -> optional default is false)>```
    * ```npm run delete-moved-zones```
