
using System;
using System.Collections.Generic;
using Hashtable=ExitGames.Client.Photon.Hashtable;
using Photon.Realtime;


public partial class PlayerBotNetwork : IConnectionCallbacks, ILobbyCallbacks, IMatchmakingCallbacks, IInRoomCallbacks
{

    public void ClearData() 
    {
clearIConnectionCallbacksData();
clearILobbyCallbacksData();
clearIMatchmakingCallbacksData();
clearIInRoomCallbacksData();
    }

    public void ClearEvents()
    {
clearIConnectionCallbacksEvents();
clearILobbyCallbacksEvents();
clearIMatchmakingCallbacksEvents();
clearIInRoomCallbacksEvents();
    }


    
    public delegate void OnConnectedHandler();

    public event OnConnectedHandler OnConnected;
    void IConnectionCallbacks.OnConnected()
    {
        
        OnConnected?.Invoke();
    }


    
    public delegate void OnConnectedToMasterHandler();

    public event OnConnectedToMasterHandler OnConnectedToMaster;
    void IConnectionCallbacks.OnConnectedToMaster()
    {
        
        OnConnectedToMaster?.Invoke();
    }


    public  DisconnectCause OnDisconnected_cause;
    public delegate void OnDisconnectedHandler(DisconnectCause cause);

    public event OnDisconnectedHandler OnDisconnected;
    void IConnectionCallbacks.OnDisconnected(DisconnectCause cause)
    {
        OnDisconnected_cause = cause;
        OnDisconnected?.Invoke(cause);
    }


    public  RegionHandler OnRegionListReceived_regionHandler;
    public delegate void OnRegionListReceivedHandler(RegionHandler regionHandler);

    public event OnRegionListReceivedHandler OnRegionListReceived;
    void IConnectionCallbacks.OnRegionListReceived(RegionHandler regionHandler)
    {
        OnRegionListReceived_regionHandler = regionHandler;
        OnRegionListReceived?.Invoke(regionHandler);
    }


    public  Dictionary<string,object> OnCustomAuthenticationResponse_data;
    public delegate void OnCustomAuthenticationResponseHandler(Dictionary<string,object> data);

    public event OnCustomAuthenticationResponseHandler OnCustomAuthenticationResponse;
    void IConnectionCallbacks.OnCustomAuthenticationResponse(Dictionary<string,object> data)
    {
        OnCustomAuthenticationResponse_data = data;
        OnCustomAuthenticationResponse?.Invoke(data);
    }


    public  string OnCustomAuthenticationFailed_debugMessage;
    public delegate void OnCustomAuthenticationFailedHandler(string debugMessage);

    public event OnCustomAuthenticationFailedHandler OnCustomAuthenticationFailed;
    void IConnectionCallbacks.OnCustomAuthenticationFailed(string debugMessage)
    {
        OnCustomAuthenticationFailed_debugMessage = debugMessage;
        OnCustomAuthenticationFailed?.Invoke(debugMessage);
    }


        private void clearIConnectionCallbacksData() 
        {
OnRegionListReceived_regionHandler = null;
OnCustomAuthenticationResponse_data = null;
OnCustomAuthenticationFailed_debugMessage = null;
        }

        private void clearIConnectionCallbacksEvents()
        {
OnConnected = null;
OnConnectedToMaster = null;
OnDisconnected = null;
OnRegionListReceived = null;
OnCustomAuthenticationResponse = null;
OnCustomAuthenticationFailed = null;
        }



    
    public delegate void OnJoinedLobbyHandler();

    public event OnJoinedLobbyHandler OnJoinedLobby;
    void ILobbyCallbacks.OnJoinedLobby()
    {
        
        OnJoinedLobby?.Invoke();
    }


    
    public delegate void OnLeftLobbyHandler();

    public event OnLeftLobbyHandler OnLeftLobby;
    void ILobbyCallbacks.OnLeftLobby()
    {
        
        OnLeftLobby?.Invoke();
    }


    public  List<RoomInfo> OnRoomListUpdate_roomList;
    public delegate void OnRoomListUpdateHandler(List<RoomInfo> roomList);

    public event OnRoomListUpdateHandler OnRoomListUpdate;
    void ILobbyCallbacks.OnRoomListUpdate(List<RoomInfo> roomList)
    {
        OnRoomListUpdate_roomList = roomList;
        OnRoomListUpdate?.Invoke(roomList);
    }


    public  List<TypedLobbyInfo> OnLobbyStatisticsUpdate_lobbyStatistics;
    public delegate void OnLobbyStatisticsUpdateHandler(List<TypedLobbyInfo> lobbyStatistics);

    public event OnLobbyStatisticsUpdateHandler OnLobbyStatisticsUpdate;
    void ILobbyCallbacks.OnLobbyStatisticsUpdate(List<TypedLobbyInfo> lobbyStatistics)
    {
        OnLobbyStatisticsUpdate_lobbyStatistics = lobbyStatistics;
        OnLobbyStatisticsUpdate?.Invoke(lobbyStatistics);
    }


        private void clearILobbyCallbacksData() 
        {
OnRoomListUpdate_roomList = null;
OnLobbyStatisticsUpdate_lobbyStatistics = null;
        }

        private void clearILobbyCallbacksEvents()
        {
OnJoinedLobby = null;
OnLeftLobby = null;
OnRoomListUpdate = null;
OnLobbyStatisticsUpdate = null;
        }



    public  List<FriendInfo> OnFriendListUpdate_friendList;
    public delegate void OnFriendListUpdateHandler(List<FriendInfo> friendList);

    public event OnFriendListUpdateHandler OnFriendListUpdate;
    void IMatchmakingCallbacks.OnFriendListUpdate(List<FriendInfo> friendList)
    {
        OnFriendListUpdate_friendList = friendList;
        OnFriendListUpdate?.Invoke(friendList);
    }


    
    public delegate void OnCreatedRoomHandler();

    public event OnCreatedRoomHandler OnCreatedRoom;
    void IMatchmakingCallbacks.OnCreatedRoom()
    {
        
        OnCreatedRoom?.Invoke();
    }


    public  short OnCreateRoomFailed_returnCode;
public  string OnCreateRoomFailed_message;
    public delegate void OnCreateRoomFailedHandler(short returnCode, string message);

    public event OnCreateRoomFailedHandler OnCreateRoomFailed;
    void IMatchmakingCallbacks.OnCreateRoomFailed(short returnCode, string message)
    {
        OnCreateRoomFailed_returnCode = returnCode;
OnCreateRoomFailed_message = message;
        OnCreateRoomFailed?.Invoke(returnCode, message);
    }


    
    public delegate void OnJoinedRoomHandler();

    public event OnJoinedRoomHandler OnJoinedRoom;
    void IMatchmakingCallbacks.OnJoinedRoom()
    {
        
        OnJoinedRoom?.Invoke();
    }


    public  short OnJoinRoomFailed_returnCode;
public  string OnJoinRoomFailed_message;
    public delegate void OnJoinRoomFailedHandler(short returnCode, string message);

    public event OnJoinRoomFailedHandler OnJoinRoomFailed;
    void IMatchmakingCallbacks.OnJoinRoomFailed(short returnCode, string message)
    {
        OnJoinRoomFailed_returnCode = returnCode;
OnJoinRoomFailed_message = message;
        OnJoinRoomFailed?.Invoke(returnCode, message);
    }


    public  short OnJoinRandomFailed_returnCode;
public  string OnJoinRandomFailed_message;
    public delegate void OnJoinRandomFailedHandler(short returnCode, string message);

    public event OnJoinRandomFailedHandler OnJoinRandomFailed;
    void IMatchmakingCallbacks.OnJoinRandomFailed(short returnCode, string message)
    {
        OnJoinRandomFailed_returnCode = returnCode;
OnJoinRandomFailed_message = message;
        OnJoinRandomFailed?.Invoke(returnCode, message);
    }


    
    public delegate void OnLeftRoomHandler();

    public event OnLeftRoomHandler OnLeftRoom;
    void IMatchmakingCallbacks.OnLeftRoom()
    {
        
        OnLeftRoom?.Invoke();
    }


        private void clearIMatchmakingCallbacksData() 
        {
OnFriendListUpdate_friendList = null;
OnCreateRoomFailed_message = null;
OnJoinRoomFailed_message = null;
OnJoinRandomFailed_message = null;
        }

        private void clearIMatchmakingCallbacksEvents()
        {
OnFriendListUpdate = null;
OnCreatedRoom = null;
OnCreateRoomFailed = null;
OnJoinedRoom = null;
OnJoinRoomFailed = null;
OnJoinRandomFailed = null;
OnLeftRoom = null;
        }



    public  Player OnPlayerEnteredRoom_newPlayer;
    public delegate void OnPlayerEnteredRoomHandler(Player newPlayer);

    public event OnPlayerEnteredRoomHandler OnPlayerEnteredRoom;
    void IInRoomCallbacks.OnPlayerEnteredRoom(Player newPlayer)
    {
        OnPlayerEnteredRoom_newPlayer = newPlayer;
        OnPlayerEnteredRoom?.Invoke(newPlayer);
    }


    public  Player OnPlayerLeftRoom_otherPlayer;
    public delegate void OnPlayerLeftRoomHandler(Player otherPlayer);

    public event OnPlayerLeftRoomHandler OnPlayerLeftRoom;
    void IInRoomCallbacks.OnPlayerLeftRoom(Player otherPlayer)
    {
        OnPlayerLeftRoom_otherPlayer = otherPlayer;
        OnPlayerLeftRoom?.Invoke(otherPlayer);
    }


    public  Hashtable OnRoomPropertiesUpdate_propertiesThatChanged;
    public delegate void OnRoomPropertiesUpdateHandler(Hashtable propertiesThatChanged);

    public event OnRoomPropertiesUpdateHandler OnRoomPropertiesUpdate;
    void IInRoomCallbacks.OnRoomPropertiesUpdate(Hashtable propertiesThatChanged)
    {
        OnRoomPropertiesUpdate_propertiesThatChanged = propertiesThatChanged;
        OnRoomPropertiesUpdate?.Invoke(propertiesThatChanged);
    }


    public  Player OnPlayerPropertiesUpdate_targetPlayer;
public  Hashtable OnPlayerPropertiesUpdate_changedProps;
    public delegate void OnPlayerPropertiesUpdateHandler(Player targetPlayer, Hashtable changedProps);

    public event OnPlayerPropertiesUpdateHandler OnPlayerPropertiesUpdate;
    void IInRoomCallbacks.OnPlayerPropertiesUpdate(Player targetPlayer, Hashtable changedProps)
    {
        OnPlayerPropertiesUpdate_targetPlayer = targetPlayer;
OnPlayerPropertiesUpdate_changedProps = changedProps;
        OnPlayerPropertiesUpdate?.Invoke(targetPlayer, changedProps);
    }


    public  Player OnMasterClientSwitched_newMasterClient;
    public delegate void OnMasterClientSwitchedHandler(Player newMasterClient);

    public event OnMasterClientSwitchedHandler OnMasterClientSwitched;
    void IInRoomCallbacks.OnMasterClientSwitched(Player newMasterClient)
    {
        OnMasterClientSwitched_newMasterClient = newMasterClient;
        OnMasterClientSwitched?.Invoke(newMasterClient);
    }


        private void clearIInRoomCallbacksData() 
        {
OnPlayerEnteredRoom_newPlayer = null;
OnPlayerLeftRoom_otherPlayer = null;
OnRoomPropertiesUpdate_propertiesThatChanged = null;
OnPlayerPropertiesUpdate_targetPlayer = null;
OnPlayerPropertiesUpdate_changedProps = null;
OnMasterClientSwitched_newMasterClient = null;
        }

        private void clearIInRoomCallbacksEvents()
        {
OnPlayerEnteredRoom = null;
OnPlayerLeftRoom = null;
OnRoomPropertiesUpdate = null;
OnPlayerPropertiesUpdate = null;
OnMasterClientSwitched = null;
        }


}

