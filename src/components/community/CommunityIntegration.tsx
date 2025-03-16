'use client';

import React, { useState } from 'react';

// UI Components
const DiscordIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [channelSettings, setChannelSettings] = useState({
    workoutChannel: '#diesel-draft',
    nutritionChannel: '#diesel-draft',
    achievementsChannel: '#general'
  });
  const [shareSettings, setShareSettings] = useState({
    shareWorkouts: true,
    shareNutrition: true,
    shareAchievements: true,
    shareDieselMeter: true
  });

  const handleConnect = () => {
    // In a real app, this would validate and store the webhook URL
    if (webhookUrl.includes('discord.com/api/webhooks')) {
      setIsConnected(true);
    } else {
      alert('Please enter a valid Discord webhook URL');
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWebhookUrl('');
  };

  const handleChannelChange = (key: keyof typeof channelSettings, value: string) => {
    setChannelSettings({
      ...channelSettings,
      [key]: value
    });
  };

  const handleShareSettingChange = (key: keyof typeof shareSettings) => {
    setShareSettings({
      ...shareSettings,
      [key]: !shareSettings[key]
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <h3 className="text-lg font-bold mb-2">Discord Integration</h3>
      
      {!isConnected ? (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Connect your Discord server to share your workouts, nutrition logs, and achievements with your community.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Discord Webhook URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="https://discord.com/api/webhooks/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1">
              Create a webhook in your Discord server settings and paste the URL here.
            </div>
          </div>
          
          <button
            className="w-full p-2 bg-[#5865F2] text-white rounded font-medium"
            onClick={handleConnect}
          >
            Connect Discord
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 font-medium">Connected to Discord</span>
            </div>
            <button
              className="text-sm text-red-600"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Channel Settings</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Workout Logs Channel</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={channelSettings.workoutChannel}
                  onChange={(e) => handleChannelChange('workoutChannel', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nutrition Logs Channel</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={channelSettings.nutritionChannel}
                  onChange={(e) => handleChannelChange('nutritionChannel', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Achievements Channel</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={channelSettings.achievementsChannel}
                  onChange={(e) => handleChannelChange('achievementsChannel', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Share Settings</h4>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="shareWorkouts"
                  className="mr-2"
                  checked={shareSettings.shareWorkouts}
                  onChange={() => handleShareSettingChange('shareWorkouts')}
                />
                <label htmlFor="shareWorkouts" className="text-sm">
                  Share workout logs (e.g., "{'{user}'} logged 3x10 squats!")
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="shareNutrition"
                  className="mr-2"
                  checked={shareSettings.shareNutrition}
                  onChange={() => handleShareSettingChange('shareNutrition')}
                />
                <label htmlFor="shareNutrition" className="text-sm">
                  Share nutrition logs (e.g., "{'{user}'} logged their meal and hit protein goal!")
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="shareAchievements"
                  className="mr-2"
                  checked={shareSettings.shareAchievements}
                  onChange={() => handleShareSettingChange('shareAchievements')}
                />
                <label htmlFor="shareAchievements" className="text-sm">
                  Share achievements (e.g., "{'{user}'} reached Diesel Trainee rank!")
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="shareDieselMeter"
                  className="mr-2"
                  checked={shareSettings.shareDieselMeter}
                  onChange={() => handleShareSettingChange('shareDieselMeter')}
                />
                <label htmlFor="shareDieselMeter" className="text-sm">
                  Enable "Share Your Gains" button to post Diesel Meter to #general
                </label>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-200 rounded text-sm">
            <div className="font-medium mb-1">Discord Role Unlocks</div>
            <div className="text-gray-600">
              • 100 Diesel Points = "Diesel Trainee" role<br />
              • 250 Diesel Points = "Diesel Master" role<br />
              • 500 Diesel Points = "Diesel Legend" role
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SkoolIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [communityId, setCommunityId] = useState('');
  const [syncSettings, setSyncSettings] = useState({
    syncPoints: true,
    syncAchievements: true,
    participateInChallenges: true
  });

  const handleConnect = () => {
    // In a real app, this would validate and store the API key and community ID
    if (apiKey && communityId) {
      setIsConnected(true);
    } else {
      alert('Please enter both Skool API Key and Community ID');
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey('');
    setCommunityId('');
  };

  const handleSyncSettingChange = (key: keyof typeof syncSettings) => {
    setSyncSettings({
      ...syncSettings,
      [key]: !syncSettings[key]
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <h3 className="text-lg font-bold mb-2">Skool Integration</h3>
      
      {!isConnected ? (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Connect your Skool community to sync Diesel Points and participate in monthly frat challenges.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Skool API Key</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Your Skool API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Community ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Your Skool Community ID"
              value={communityId}
              onChange={(e) => setCommunityId(e.target.value)}
            />
          </div>
          
          <button
            className="w-full p-2 bg-blue-600 text-white rounded font-medium"
            onClick={handleConnect}
          >
            Connect Skool
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 font-medium">Connected to Skool</span>
            </div>
            <button
              className="text-sm text-red-600"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Sync Settings</h4>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="syncPoints"
                  className="mr-2"
                  checked={syncSettings.syncPoints}
                  onChange={() => handleSyncSettingChange('syncPoints')}
                />
                <label htmlFor="syncPoints" className="text-sm">
                  Sync Diesel Points to Skool community
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="syncAchievements"
                  className="mr-2"
                  checked={syncSettings.syncAchievements}
                  onChange={() => handleSyncSettingChange('syncAchievements')}
                />
                <label htmlFor="syncAchievements" className="text-sm">
                  Sync achievements and milestones
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="participateInChallenges"
                  className="mr-2"
                  checked={syncSettings.participateInChallenges}
                  onChange={() => handleSyncSettingChange('participateInChallenges')}
                />
                <label htmlFor="participateInChallenges" className="text-sm">
                  Participate in monthly frat challenges
                </label>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-200 rounded text-sm">
            <div className="font-medium mb-1">Monthly Frat Challenges</div>
            <div className="text-gray-600">
              • Points sync automatically for monthly leaderboards<br />
              • Top 3 members each month get the "Diesel Legend" role<br />
              • Future update: 1000 points = "Diesel Frat Captain"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShareYourGains = () => {
  const [message, setMessage] = useState('');
  
  const handleShare = () => {
    // In a real app, this would post to Discord via the webhook
    alert('Your gains have been shared to #general!');
    setMessage('');
  };
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <h3 className="text-lg font-bold mb-2">Share Your Gains</h3>
      
      <div className="p-3 bg-white rounded shadow mb-4">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            CD
          </div>
          <div>
            <div className="font-medium">Your Diesel Meter</div>
            <div className="text-xs text-gray-500">175 points • 5-day streak</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className="bg-red-600 h-4 rounded-full" 
            style={{ width: '35%' }}
          ></div>
        </div>
        
        <div className="text-sm text-gray-600">
          I'm on my way to becoming a Diesel Legend! 💪
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Add a message (optional)</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Just crushed leg day! #NoPainNoGain"
        ></textarea>
      </div>
      
      <button
        className="w-full p-2 bg-red-600 text-white rounded font-medium"
        onClick={handleShare}
      >
        Share to Discord
      </button>
    </div>
  );
};

const CommunityIntegration = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Community Integration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DiscordIntegration />
        <SkoolIntegration />
      </div>
      
      <ShareYourGains />
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Community Benefits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-medium mb-2">Accountability</h4>
            <div className="text-sm text-gray-600">
              Sharing your workouts and nutrition logs with your community creates accountability and motivation. When others see your progress, you're more likely to stay consistent.
            </div>
          </div>
          
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-medium mb-2">Recognition</h4>
            <div className="text-sm text-gray-600">
              Earn special roles and recognition in the community as you accumulate Diesel Points. Show off your dedication and progress to fellow CDU members.
            </div>
          </div>
          
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-medium mb-2">Friendly Competition</h4>
            <div className="text-sm text-gray-600">
              Participate in monthly challenges and compete with other members for the top spots on the leaderboard. Friendly competition can push you to new heights.
            </div>
          </div>
          
          <div className="p-3 bg-white rounded shadow">
            <h4 className="font-medium mb-2">Support Network</h4>
            <div className="text-sm text-gray-600">
              Connect with like-minded individuals who share your fitness goals. Get advice, share tips, and support each other through the fitness journey.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityIntegration;
