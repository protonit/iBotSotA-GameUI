


using System;
using System.Collections.Generic;

public partial class SettingData 
{
    public videoSettings video = new videoSettings();
    public audioSettings audio = new audioSettings();
    public controlSettings control = new controlSettings();
}
public partial class videoSettings 
{
    public double FpsCap;
}
public partial class audioSettings 
{
    public double MasterVolume;
    public double MusicVolume;
}
public partial class controlSettings 
{
    public double Sensitivity;
}


