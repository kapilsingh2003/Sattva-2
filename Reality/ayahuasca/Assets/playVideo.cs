using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;

public class playVideo : MonoBehaviour
{
    public VideoPlayer videoPlayer;
    public RenderTexture renderTexture;

    void Start()
    {
        videoPlayer.targetTexture = renderTexture;
        videoPlayer.Play();
    }
}
