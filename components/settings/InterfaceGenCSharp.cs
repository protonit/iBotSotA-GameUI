


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
    public double FpsCap;
}
[DebuggerDisplay("MasterVolume: {MasterVolume} MusicVolume: {MusicVolume}")]
public partial class audioSettings 
{
    public double MasterVolume;
    public double MusicVolume;
}
[DebuggerDisplay("Sensitivity: {Sensitivity} AimSensitivity: {AimSensitivity}")]
public partial class controlSettings 
{
    public double Sensitivity;
    public double AimSensitivity;
}


