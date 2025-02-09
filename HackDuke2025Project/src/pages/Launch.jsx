import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Launch.css';

const Launch = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    const savedDraft = localStorage.getItem('startupDraft');
    return savedDraft ? JSON.parse(savedDraft) : {
      // Company Information
      companyName: '',
      industry: '',
      description: '',
      shortPitch: '', // 140-character pitch
      longDescription: '', // Detailed company description
      foundedDate: '',
      stage: '', // Seed, Series A, etc.
      location: '',

      // Team Information
      teamMembers: [{
        name: '',
        role: '',
        bio: '',
        linkedin: ''
      }],

      // Financial Information
      totalShares: '',
      sharesOffered: '',
      sharePrice: '',
      minInvestment: '',
      maxInvestment: '',
      preMoney: '',
      fundingGoal: '',
      equityOffered: '',
      currentFunding: '',
      previousRounds: [{
        round: '',
        amount: '',
        date: '',
        investors: ''
      }],

      // Campaign Details
      campaignDuration: 30, // days
      startDate: '',
      endDate: '',
      useOfFunds: '',
      milestones: [{
        title: '',
        description: '',
        date: '',
        fundingRequired: ''
      }],

      // Market & Traction
      marketSize: '',
      targetMarket: '',
      competitors: '',
      competitiveAdvantage: '',
      currentRevenue: '',
      revenueModel: '',
      customerBase: '',
      metrics: {
        mrr: '',
        growth: '',
        users: '',
        retention: ''
      },

      // Media & Documents
      logo: null,
      pitchDeck: null,
      financialProjections: null,
      productImages: [],
      videos: [],
      website: '',
      socialMedia: {
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: ''
      },

      // Legal & Compliance
      companyRegistration: '',
      taxId: '',
      legalStructure: '',
      intellectualProperty: '',
      regulatoryInfo: ''
    };
  });

  const steps = [
    {
      title: "Basic Information",
      description: "Company overview and basic details",
      fields: ["companyName", "industry", "shortPitch", "foundedDate", "stage", "location"]
    },
    {
      title: "Team",
      description: "Information about founders and key team members",
      fields: ["teamMembers"]
    },
    {
      title: "Offering Details",
      description: "Share structure and investment terms",
      fields: ["totalShares", "sharesOffered", "sharePrice", "minInvestment", "maxInvestment", "equityOffered"]
    },
    {
      title: "Financial Information",
      description: "Current financials and funding history",
      fields: ["preMoney", "fundingGoal", "currentFunding", "previousRounds"]
    },
    {
      title: "Campaign Details",
      description: "Campaign duration and milestones",
      fields: ["campaignDuration", "startDate", "endDate", "useOfFunds", "milestones"]
    },
    {
      title: "Market & Traction",
      description: "Market analysis and business metrics",
      fields: ["marketSize", "targetMarket", "competitors", "metrics"]
    },
    {
      title: "Media & Documents",
      description: "Upload supporting materials",
      fields: ["logo", "pitchDeck", "financialProjections", "productImages"]
    },
    {
      title: "Legal & Compliance",
      description: "Legal documentation and compliance",
      fields: ["companyRegistration", "taxId", "legalStructure", "intellectualProperty"]
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('startupDraft', JSON.stringify(formData));
    alert('Progress saved successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle final submission
    console.log('Final submission:', formData);
    // Clear draft after successful submission
    localStorage.removeItem('startupDraft');
    navigate('/');
  };

  // Add validation function
  const isStepComplete = (stepIndex) => {
    const step = steps[stepIndex];
    const fields = step.fields;
    
    return fields.every(field => {
      if (field === 'teamMembers') {
        return formData.teamMembers.length > 0 && 
          formData.teamMembers.every(member => 
            member.name && member.role && member.bio
          );
      }
      
      if (field === 'milestones') {
        return formData.milestones.length > 0 && 
          formData.milestones.every(milestone => 
            milestone.title && milestone.description && milestone.date
          );
      }
      
      if (typeof formData[field] === 'string') {
        return formData[field].trim() !== '';
      }
      
      return !!formData[field];
    });
  };

  // Update the Next button click handler
  const handleNext = () => {
    if (isStepComplete(activeStep)) {
      setActiveStep(prev => prev + 1);
      setError('');
    } else {
      setError('Please complete all required fields before proceeding');
    }
  };

  // Add error state
  const [error, setError] = useState('');

  const renderBasicInformation = () => (
    <div className="form-section">
      <h2>Basic Information</h2>
      <p className="section-description">Tell us about your company</p>
      
      <div className="form-group">
        <label>Company Name *</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Industry *</label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        >
          <option value="">Select Industry</option>
          <option value="Clean Energy">Clean Energy</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Fintech">Fintech</option>
          <option value="AI">AI</option>
          <option value="Logistics">Logistics</option>
          <option value="E-commerce">E-commerce</option>
          <option value="SaaS">SaaS</option>
          <option value="Hardware">Hardware</option>
        </select>
      </div>

      <div className="form-group">
        <label>Short Pitch (140 characters) *</label>
        <input
          type="text"
          name="shortPitch"
          value={formData.shortPitch}
          onChange={handleChange}
          maxLength={140}
          placeholder="Describe your startup in one sentence"
          required
        />
        <span className="character-count">{formData.shortPitch.length}/140</span>
      </div>

      <div className="form-group">
        <label>Detailed Description *</label>
        <textarea
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          rows="6"
          placeholder="Provide a comprehensive description of your company, product, and vision"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label>Founded Date *</label>
          <input
            type="date"
            name="foundedDate"
            value={formData.foundedDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group half">
          <label>Company Stage *</label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            required
          >
            <option value="">Select Stage</option>
            <option value="Idea">Idea Stage</option>
            <option value="MVP">MVP</option>
            <option value="Pre-Seed">Pre-Seed</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Series B+">Series B+</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, State, Country"
          required
        />
      </div>
    </div>
  );

  const renderTeamInformation = () => (
    <div className="form-section">
      <h2>Team Information</h2>
      <p className="section-description">Tell us about your founding team</p>

      {formData.teamMembers.map((member, index) => (
        <div key={index} className="team-member-card">
          <h3>Team Member {index + 1}</h3>
          <div className="form-row">
            <div className="form-group half">
              <label>Full Name *</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                required
              />
            </div>
            <div className="form-group half">
              <label>Role *</label>
              <input
                type="text"
                value={member.role}
                onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                placeholder="e.g., CEO, CTO, Lead Developer"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bio *</label>
            <textarea
              value={member.bio}
              onChange={(e) => handleTeamMemberChange(index, 'bio', e.target.value)}
              rows="3"
              placeholder="Brief background and relevant experience"
              required
            />
          </div>

          <div className="form-group">
            <label>LinkedIn Profile</label>
            <input
              type="url"
              value={member.linkedin}
              onChange={(e) => handleTeamMemberChange(index, 'linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {index > 0 && (
            <button
              type="button"
              className="remove-button"
              onClick={() => removeTeamMember(index)}
            >
              Remove Team Member
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="add-button"
        onClick={addTeamMember}
      >
        + Add Team Member
      </button>
    </div>
  );

  // Add handlers for team members
  const handleTeamMemberChange = (index, field, value) => {
    setFormData(prev => {
      const newTeamMembers = [...prev.teamMembers];
      newTeamMembers[index] = {
        ...newTeamMembers[index],
        [field]: value
      };
      return {
        ...prev,
        teamMembers: newTeamMembers
      };
    });
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        { name: '', role: '', bio: '', linkedin: '' }
      ]
    }));
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  // Add these handlers after the team member handlers

  const handlePreviousRoundChange = (index, field, value) => {
    setFormData(prev => {
      const newRounds = [...prev.previousRounds];
      newRounds[index] = {
        ...newRounds[index],
        [field]: value
      };
      return {
        ...prev,
        previousRounds: newRounds
      };
    });
  };

  const addPreviousRound = () => {
    setFormData(prev => ({
      ...prev,
      previousRounds: [
        ...prev.previousRounds,
        { round: '', amount: '', date: '', investors: '' }
      ]
    }));
  };

  const removePreviousRound = (index) => {
    setFormData(prev => ({
      ...prev,
      previousRounds: prev.previousRounds.filter((_, i) => i !== index)
    }));
  };

  // Campaign Details Section
  const renderCampaignDetails = () => (
    <div className="form-section">
      <h2>Campaign Details</h2>
      <p className="section-description">Define your fundraising campaign</p>

      <div className="form-row">
        <div className="form-group half">
          <label>Campaign Duration (days) *</label>
          <input
            type="number"
            name="campaignDuration"
            value={formData.campaignDuration}
            onChange={handleChange}
            min="1"
            max="180"
            required
          />
        </div>
        <div className="form-group half">
          <label>Start Date *</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Use of Funds *</label>
        <textarea
          name="useOfFunds"
          value={formData.useOfFunds}
          onChange={handleChange}
          rows="4"
          required
          placeholder="Describe how you plan to use the raised funds"
        />
      </div>

      <h3>Milestones</h3>
      {formData.milestones.map((milestone, index) => (
        <div key={index} className="milestone-card">
          <div className="form-group">
            <label>Milestone Title *</label>
            <input
              type="text"
              value={milestone.title}
              onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={milestone.description}
              onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
              rows="3"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Target Date *</label>
              <input
                type="date"
                value={milestone.date}
                onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                required
              />
            </div>
            <div className="form-group half">
              <label>Funding Required (USD) *</label>
              <input
                type="number"
                value={milestone.fundingRequired}
                onChange={(e) => handleMilestoneChange(index, 'fundingRequired', e.target.value)}
                min="0"
                required
              />
            </div>
          </div>

          {index > 0 && (
            <button
              type="button"
              className="remove-button"
              onClick={() => removeMilestone(index)}
            >
              Remove Milestone
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="add-button"
        onClick={addMilestone}
      >
        + Add Milestone
      </button>
    </div>
  );

  // Add milestone handlers
  const handleMilestoneChange = (index, field, value) => {
    setFormData(prev => {
      const newMilestones = [...prev.milestones];
      newMilestones[index] = {
        ...newMilestones[index],
        [field]: value
      };
      return {
        ...prev,
        milestones: newMilestones
      };
    });
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { title: '', description: '', date: '', fundingRequired: '' }
      ]
    }));
  };

  const removeMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  // Add this after renderTeamInformation
  const renderOfferingDetails = () => (
    <div className="form-section">
      <h2>Offering Details</h2>
      <p className="section-description">Define your investment structure</p>

      <div className="form-row">
        <div className="form-group half">
          <label>Total Company Shares *</label>
          <input
            type="number"
            name="totalShares"
            value={formData.totalShares}
            onChange={handleChange}
            min="1"
            required
            placeholder="e.g., 1000000"
          />
        </div>
        <div className="form-group half">
          <label>Shares Offered *</label>
          <input
            type="number"
            name="sharesOffered"
            value={formData.sharesOffered}
            onChange={handleChange}
            min="1"
            required
            placeholder="e.g., 100000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label>Share Price (USD) *</label>
          <input
            type="number"
            name="sharePrice"
            value={formData.sharePrice}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            placeholder="e.g., 10.00"
          />
        </div>
        <div className="form-group half">
          <label>Equity Offered (%) *</label>
          <input
            type="number"
            name="equityOffered"
            value={formData.equityOffered}
            onChange={handleChange}
            min="0.01"
            max="100"
            step="0.01"
            required
            placeholder="e.g., 10.00"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label>Minimum Investment (USD) *</label>
          <input
            type="number"
            name="minInvestment"
            value={formData.minInvestment}
            onChange={handleChange}
            min="1"
            required
            placeholder="e.g., 1000"
          />
        </div>
        <div className="form-group half">
          <label>Maximum Investment (USD) *</label>
          <input
            type="number"
            name="maxInvestment"
            value={formData.maxInvestment}
            onChange={handleChange}
            min="1"
            required
            placeholder="e.g., 100000"
          />
        </div>
      </div>
    </div>
  );

  const renderFinancialInformation = () => (
    <div className="form-section">
      <h2>Financial Information</h2>
      <p className="section-description">Share your company's financial details</p>

      <div className="form-row">
        <div className="form-group half">
          <label>Pre-Money Valuation (USD) *</label>
          <input
            type="number"
            name="preMoney"
            value={formData.preMoney}
            onChange={handleChange}
            min="0"
            required
            placeholder="e.g., 1000000"
          />
        </div>
        <div className="form-group half">
          <label>Funding Goal (USD) *</label>
          <input
            type="number"
            name="fundingGoal"
            value={formData.fundingGoal}
            onChange={handleChange}
            min="1"
            required
            placeholder="e.g., 500000"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Current Funding/Investment *</label>
        <input
          type="number"
          name="currentFunding"
          value={formData.currentFunding}
          onChange={handleChange}
          min="0"
          required
          placeholder="Total funding raised to date"
        />
      </div>

      <h3>Previous Funding Rounds</h3>
      {formData.previousRounds.map((round, index) => (
        <div key={index} className="funding-round-card">
          <div className="form-row">
            <div className="form-group half">
              <label>Round Type</label>
              <select
                value={round.round}
                onChange={(e) => handlePreviousRoundChange(index, 'round', e.target.value)}
              >
                <option value="">Select Round</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
                <option value="Series C">Series C</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group half">
              <label>Amount Raised (USD)</label>
              <input
                type="number"
                value={round.amount}
                onChange={(e) => handlePreviousRoundChange(index, 'amount', e.target.value)}
                placeholder="e.g., 500000"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Date</label>
              <input
                type="date"
                value={round.date}
                onChange={(e) => handlePreviousRoundChange(index, 'date', e.target.value)}
              />
            </div>
            <div className="form-group half">
              <label>Key Investors</label>
              <input
                type="text"
                value={round.investors}
                onChange={(e) => handlePreviousRoundChange(index, 'investors', e.target.value)}
                placeholder="Names of key investors"
              />
            </div>
          </div>

          {index > 0 && (
            <button
              type="button"
              className="remove-button"
              onClick={() => removePreviousRound(index)}
            >
              Remove Round
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        className="add-button"
        onClick={addPreviousRound}
      >
        + Add Funding Round
      </button>
    </div>
  );

  const renderMarketTraction = () => (
    <div className="form-section">
      <h2>Market & Traction</h2>
      <p className="section-description">Tell us about your market opportunity and current traction</p>

      <div className="form-group">
        <label>Total Addressable Market Size (USD) *</label>
        <input
          type="number"
          name="marketSize"
          value={formData.marketSize}
          onChange={handleChange}
          min="0"
          required
          placeholder="e.g., 1000000000"
        />
        <small className="helper-text">Estimate the total market size for your product/service</small>
      </div>

      <div className="form-group">
        <label>Target Market Description *</label>
        <textarea
          name="targetMarket"
          value={formData.targetMarket}
          onChange={handleChange}
          rows="4"
          required
          placeholder="Describe your ideal customer profile and target market segments"
        />
      </div>

      <div className="form-group">
        <label>Competitors Analysis *</label>
        <textarea
          name="competitors"
          value={formData.competitors}
          onChange={handleChange}
          rows="4"
          required
          placeholder="List main competitors and describe your competitive landscape"
        />
      </div>

      <div className="form-group">
        <label>Competitive Advantage *</label>
        <textarea
          name="competitiveAdvantage"
          value={formData.competitiveAdvantage}
          onChange={handleChange}
          rows="4"
          required
          placeholder="What makes your solution unique? What are your sustainable competitive advantages?"
        />
      </div>

      <div className="form-row">
        <div className="form-group half">
          <label>Current Monthly Revenue (USD)</label>
          <input
            type="number"
            name="currentRevenue"
            value={formData.currentRevenue}
            onChange={handleChange}
            min="0"
            placeholder="e.g., 10000"
          />
        </div>
        <div className="form-group half">
          <label>Revenue Model *</label>
          <select
            name="revenueModel"
            value={formData.revenueModel}
            onChange={handleChange}
            required
          >
            <option value="">Select Model</option>
            <option value="Subscription">Subscription</option>
            <option value="Transactional">Transactional</option>
            <option value="Marketplace">Marketplace</option>
            <option value="Licensing">Licensing</option>
            <option value="Advertising">Advertising</option>
            <option value="Hardware">Hardware Sales</option>
            <option value="Service">Service Fees</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Current Customer Base *</label>
        <textarea
          name="customerBase"
          value={formData.customerBase}
          onChange={handleChange}
          rows="3"
          required
          placeholder="Describe your current customers and user base"
        />
      </div>

      <h3>Key Metrics</h3>
      <div className="metrics-section">
        <div className="form-row">
          <div className="form-group half">
            <label>Monthly Recurring Revenue (USD)</label>
            <input
              type="number"
              name="metrics.mrr"
              value={formData.metrics.mrr}
              onChange={handleMetricsChange}
              min="0"
              placeholder="e.g., 10000"
            />
          </div>
          <div className="form-group half">
            <label>Growth Rate (% monthly)</label>
            <input
              type="number"
              name="metrics.growth"
              value={formData.metrics.growth}
              onChange={handleMetricsChange}
              min="0"
              max="1000"
              step="0.1"
              placeholder="e.g., 20"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Active Users/Customers</label>
            <input
              type="number"
              name="metrics.users"
              value={formData.metrics.users}
              onChange={handleMetricsChange}
              min="0"
              placeholder="e.g., 1000"
            />
          </div>
          <div className="form-group half">
            <label>Customer Retention Rate (%)</label>
            <input
              type="number"
              name="metrics.retention"
              value={formData.metrics.retention}
              onChange={handleMetricsChange}
              min="0"
              max="100"
              step="0.1"
              placeholder="e.g., 85"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Add this handler for metrics
  const handleMetricsChange = (e) => {
    const { name, value } = e.target;
    const metricKey = name.split('.')[1];
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metricKey]: value
      }
    }));
  };

  const renderMediaDocuments = () => (
    <div className="form-section">
      <h2>Media & Documents</h2>
      <p className="section-description">Upload supporting materials for your startup</p>

      <div className="form-group">
        <label>Company Logo *</label>
        <input
          type="file"
          name="logo"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <small className="helper-text">Recommended size: 500x500px, max 2MB</small>
      </div>

      <div className="form-group">
        <label>Pitch Deck *</label>
        <input
          type="file"
          name="pitchDeck"
          onChange={handleFileChange}
          accept=".pdf,.ppt,.pptx"
          required
        />
        <small className="helper-text">Upload your pitch deck (PDF or PowerPoint)</small>
      </div>

      <div className="form-group">
        <label>Financial Projections *</label>
        <input
          type="file"
          name="financialProjections"
          onChange={handleFileChange}
          accept=".pdf,.xlsx,.xls,.csv"
          required
        />
        <small className="helper-text">Upload your financial projections (Excel or PDF)</small>
      </div>

      <div className="form-group">
        <label>Product/Service Images</label>
        <input
          type="file"
          name="productImages"
          onChange={handleMultipleFileChange}
          accept="image/*"
          multiple
        />
        <small className="helper-text">Upload up to 5 images showcasing your product/service</small>
      </div>

      <div className="form-group">
        <label>Website URL</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://your-company.com"
        />
      </div>

      <div className="social-media-section">
        <h3>Social Media Profiles</h3>
        <div className="form-row">
          <div className="form-group half">
            <label>LinkedIn</label>
            <input
              type="url"
              name="socialMedia.linkedin"
              value={formData.socialMedia.linkedin}
              onChange={handleSocialMediaChange}
              placeholder="https://linkedin.com/company/..."
            />
          </div>
          <div className="form-group half">
            <label>Twitter</label>
            <input
              type="url"
              name="socialMedia.twitter"
              value={formData.socialMedia.twitter}
              onChange={handleSocialMediaChange}
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLegalCompliance = () => (
    <div className="form-section">
      <h2>Legal & Compliance</h2>
      <p className="section-description">Provide legal information about your company</p>

      <div className="form-group">
        <label>Company Registration Number *</label>
        <input
          type="text"
          name="companyRegistration"
          value={formData.companyRegistration}
          onChange={handleChange}
          required
          placeholder="Enter your company's registration number"
        />
      </div>

      <div className="form-group">
        <label>Tax ID/EIN *</label>
        <input
          type="text"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
          required
          placeholder="Enter your company's tax ID"
        />
      </div>

      <div className="form-group">
        <label>Legal Structure *</label>
        <select
          name="legalStructure"
          value={formData.legalStructure}
          onChange={handleChange}
          required
        >
          <option value="">Select Structure</option>
          <option value="LLC">LLC</option>
          <option value="C-Corp">C-Corporation</option>
          <option value="S-Corp">S-Corporation</option>
          <option value="B-Corp">B-Corporation</option>
          <option value="Partnership">Partnership</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
        </select>
      </div>

      <div className="form-group">
        <label>Intellectual Property *</label>
        <textarea
          name="intellectualProperty"
          value={formData.intellectualProperty}
          onChange={handleChange}
          rows="4"
          required
          placeholder="Describe any patents, trademarks, or other intellectual property"
        />
      </div>

      <div className="form-group">
        <label>Regulatory Information</label>
        <textarea
          name="regulatoryInfo"
          value={formData.regulatoryInfo}
          onChange={handleChange}
          rows="4"
          placeholder="Describe any relevant regulatory requirements or compliance matters"
        />
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            required
          />
          I confirm that all information provided is accurate and complete
        </label>
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            required
          />
          I agree to the terms and conditions of the platform
        </label>
      </div>
    </div>
  );

  // Add these handlers for file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleMultipleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Array.from(files)
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    const platform = name.split('.')[1];
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  return (
    <div className="launch-page">
      <div className="launch-container">
        <div className="progress-bar">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className={`progress-step ${index === activeStep ? 'active' : ''} 
                ${index < activeStep ? 'completed' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="launch-form">
          {activeStep === 0 && renderBasicInformation()}
          {activeStep === 1 && renderTeamInformation()}
          {activeStep === 2 && renderOfferingDetails()}
          {activeStep === 3 && renderFinancialInformation()}
          {activeStep === 4 && renderCampaignDetails()}
          {activeStep === 5 && renderMarketTraction()}
          {activeStep === 6 && renderMediaDocuments()}
          {activeStep === 7 && renderLegalCompliance()}

          <div className="form-actions">
            <button 
              type="button" 
              className="secondary-button"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>
            {activeStep > 0 && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => setActiveStep(prev => prev - 1)}
              >
                Previous
              </button>
            )}
            {error && <div className="error-message">{error}</div>}
            {activeStep < steps.length - 1 ? (
              <button
                type="button"
                className="primary-button"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="primary-button"
                disabled={!isStepComplete(activeStep)}
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Launch; 