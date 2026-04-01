import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:base/Time";

actor {
  type EngineSpecs = {
    engineType : Text;
    displacement : Nat;
    maxPower : Text;
    emissionType : Text;
    coolingSystem : Text;
    transmission : Text;
    fuelSupplyType : Text;
  };

  type PriceRange = {
    priceMin : Nat;
    priceMax : Nat;
  };

  type Bike = {
    name : Text;
    brand : Text;
    category : Text;
    rating : Nat;
    price : PriceRange;
    photoId : Text;
    engineSpecs : EngineSpecs;
  };

  type Brand = {
    name : Text;
    url : Text;
  };

  type Lead = {
    id : Nat;
    name : Text;
    phone : Text;
    city : Text;
    bikeName : Text;
    formType : Text;
    timestamp : Int;
  };

  type User = {
    id : Nat;
    email : Text;
    password : Text;
  };

  module Brand {
    public func compare(b1 : Brand, b2 : Brand) : Order.Order {
      Text.compare(b1.name, b2.name);
    };
  };

  module Bike {
    public func compare(b1 : Bike, b2 : Bike) : Order.Order {
      Text.compare(b1.name, b2.name);
    };
  };

  module Lead {
    public func compareDesc(l1 : Lead, l2 : Lead) : Order.Order {
      Int.compare(l2.timestamp, l1.timestamp);
    };
  };

  let bikes = Map.empty<Nat, Bike>();
  let brands = Map.empty<Nat, Brand>();
  let leads = Map.empty<Nat, Lead>();
  let users = Map.empty<Nat, User>();

  func getNextBikeId() : Nat {
    let newId = bikes.size();
    if (bikes.containsKey(newId)) { Runtime.trap("Bike ID overflow") };
    newId;
  };

  func getNextBrandId() : Nat {
    let newId = brands.size();
    if (brands.containsKey(newId)) { Runtime.trap("Brand ID overflow") };
    newId;
  };

  func getNextLeadId() : Nat {
    leads.size();
  };

  func getNextUserId() : Nat {
    users.size();
  };

  // Register a new user with email and password
  public func registerUser(email : Text, password : Text) : async { #ok : Nat; #err : Text } {
    // Check if email already exists
    for (user in users.values()) {
      if (Text.equal(user.email, email)) {
        return #err("Email already registered");
      };
    };
    let userId = getNextUserId();
    let user : User = {
      id = userId;
      email = email;
      password = password;
    };
    users.add(userId, user);
    #ok(userId);
  };

  // Login with email and password
  public func loginUser(email : Text, password : Text) : async { #ok : Nat; #err : Text } {
    for (user in users.values()) {
      if (Text.equal(user.email, email) and Text.equal(user.password, password)) {
        return #ok(user.id);
      };
    };
    #err("Invalid email or password");
  };

  // Submit a lead (from Get Offers or Book a Test Ride forms)
  public func submitLead(name : Text, phone : Text, city : Text, bikeName : Text, formType : Text) : async Nat {
    let leadId = getNextLeadId();
    let lead : Lead = {
      id = leadId;
      name = name;
      phone = phone;
      city = city;
      bikeName = bikeName;
      formType = formType;
      timestamp = Time.now();
    };
    leads.add(leadId, lead);
    leadId;
  };

  // Get all leads (admin dashboard)
  public query func getLeads() : async [Lead] {
    leads.values().toArray().sort(Lead.compareDesc);
  };

  // Add new bike listing
  public shared ({ caller }) func addBike(bike : Bike) : async Nat {
    let bikeId = getNextBikeId();
    bikes.add(bikeId, bike);
    bikeId;
  };

  // Add new brand
  public shared ({ caller }) func addBrand(brand : Brand) : async Nat {
    let brandId = getNextBrandId();
    brands.add(brandId, brand);
    brandId;
  };

  // Get all bikes
  public query ({ caller }) func getAllBikes() : async [Bike] {
    bikes.values().toArray().sort();
  };

  // Get bikes by category, sorted by name
  public query ({ caller }) func getBikesByCategory(category : Text) : async [Bike] {
    bikes.values().toArray().filter(
      func(bike) {
        Text.equal(bike.category, category);
      }
    ).sort();
  };

  // Get bikes by brand, sorted by name
  public query ({ caller }) func getBikesByBrand(brandName : Text) : async [Bike] {
    bikes.values().toArray().filter(
      func(bike) {
        Text.equal(bike.brand, brandName);
      }
    ).sort();
  };

  // Get bikes within a price range, sorted by name
  public query ({ caller }) func getBikesByPriceRange(minPrice : Nat, maxPrice : Nat) : async [Bike] {
    bikes.values().toArray().filter(
      func(bike) {
        bike.price.priceMin >= minPrice and bike.price.priceMax <= maxPrice;
      }
    ).sort();
  };

  // Get featured bikes (rating >= 4)
  public query ({ caller }) func getFeaturedBikes() : async [Bike] {
    bikes.values().toArray().filter(
      func(bike) { bike.rating >= 4 }
    ).sort();
  };

  // Get all available categories
  public query ({ caller }) func getCategories() : async [Text] {
    let categoriesList = List.empty<Text>();

    for (bike in bikes.values()) {
      if (not categoriesList.toArray().any(func(existing) { Text.equal(existing, bike.category) })) {
        categoriesList.add(bike.category);
      };
    };

    if (categoriesList.isEmpty()) {
      Runtime.trap("No bikes available");
    };

    categoriesList.toArray();
  };

  // Get all brands
  public query ({ caller }) func getAllBrands() : async [Brand] {
    brands.values().toArray().sort();
  };

  // Get bike by ID
  public query ({ caller }) func getBike(bikeId : Nat) : async ?Bike {
    bikes.get(bikeId);
  };

  // Get brand by ID
  public query ({ caller }) func getBrand(brandId : Nat) : async ?Brand {
    brands.get(brandId);
  };
};
