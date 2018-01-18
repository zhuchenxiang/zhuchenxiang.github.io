function FindProxyForURL(url, host)
{
    if (shExpMatch(host, "10.205.*.*"))
        return "SOCKS ucs-bastion.opg.cn:1080";

    return "DIRECT";
}
