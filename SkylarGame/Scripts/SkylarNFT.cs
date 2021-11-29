using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class SkylarNFT : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(GetTexture());
    }

    IEnumerator GetTexture()
    {
        UnityWebRequest www = UnityWebRequestTexture.GetTexture("https://gateway.pinata.cloud/ipfs/QmbcTCqGAoWrKJu9AppPWuDzPiaScq335H2U9MooomCU3g");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
            Destroy(this.gameObject);
        }
        else
        {
            this.gameObject.GetComponent<Renderer>().material.mainTexture = ((DownloadHandlerTexture)www.downloadHandler).texture;
        }
    }
}

