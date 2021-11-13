


using System;
using System.Diagnostics;
using System.Collections.Generic;

public partial class SettingData 
{
    public videoSettings video = new videoSettings();
    public audioSettings audio = new audioSettings();
    public controlSettings control = new controlSettings();
}
[DebuggerDisplay("FpsCap: {FpsCap}")]
public partial class videoSettings 
{
    public int FpsCap;
}
[DebuggerDisplay("MasterVolume: {MasterVolume} MusicVolume: {MusicVolume}")]
public partial class audioSettings 
{
    public int MasterVolume;
    public int MusicVolume;
}
[DebuggerDisplay("Sensitivity: {Sensitivity} AimSensitivity: {AimSensitivity}")]
public partial class controlSettings 
{
    public float Sensitivity;
    public float AimSensitivity;
}

// UI Classes


public class UIData
{
	public CharData[] CharDatas;
	public MatchData MatchData;
}



public class CharData
{
	public string Name;
	public float HealthPct;
}

public class MatchData
{
	public int CurrentChamber;
	public int ChamberCount;
	public DateTime ChamberTime;
	public DateTime MatchTime;
}

