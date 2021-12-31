using System.Collections;
using System.Numerics;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MyBalance : MonoBehaviour
{
    async void Start()
    {
        string chain = "metis ethereum";
        string network = "testnet";
        string contract = "0x60f80121c31a0d46b5279700f9df786054aa5ee5";
        string account = PlayerPrefs.GetString("Account");

        int balance = await ERC721.BalanceOf(chain, network, contract, account);
        print(balance);
    }
}
